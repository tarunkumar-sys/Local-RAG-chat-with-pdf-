import { NextRequest, NextResponse } from "next/server";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userQuery = searchParams.get("message");

  if (!userQuery) {
    return NextResponse.json({ error: "No message provided" }, { status: 400 });
  }

  try {
    const embeddings = new OllamaEmbeddings({
      model: "nomic-embed-text",
      baseUrl: "http://localhost:11434",
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: "http://localhost:6333",
        collectionName: "pdf-uplodes",
      }
    );

    const ret = vectorStore.asRetriever({
      k: 2,
    });

    const result = await ret.invoke(userQuery);

    // SYSTEM PROMPT
    const SYSTEM_PROMPT = `
You are a helpful AI Assistant who answers the user query based on the available context from a PDF file.

Context:
${JSON.stringify(result)}
`;

    // Compose prompt (like OpenAI chat format)
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question:\n${userQuery}\n\nAnswer:`;

    // Send to Ollama (local server)
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "tinyllama", // or 'gemma:2b', 'phi3', etc.
        prompt: fullPrompt,
        stream: false,
      }),
    });

    const data = await ollamaResponse.json();

    return NextResponse.json({
      message: data.response,
      docs: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
