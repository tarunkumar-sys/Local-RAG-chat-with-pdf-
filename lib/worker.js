import { Worker } from "bullmq";
// import { OpenAIEmbeddings } from '@langchain/openai';
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant"; // ✅ CORRECT
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    try {
      console.log("Job received:", job.data);
      const data = JSON.parse(job.data);

      // Step 1: Load PDF
      const loader = new PDFLoader(data.path);
      const rawDocs = await loader.load();
      console.log("PDF loaded. Number of pages:", rawDocs.length);

      // Step 2: Split into chunks
      const textSplitter = new CharacterTextSplitter({
        chunkSize: 300,
        chunkOverlap: 20,
      });
      const splitDocs = await textSplitter.splitDocuments(rawDocs);
      console.log("Split into chunks:", splitDocs.length);

      // Step 3: Prepare embeddings
      //   const embeddings = new OpenAIEmbeddings({
      //     model: 'text-embedding-3-small',
      //     apiKey: 'use your open ai key',
      //   });

      // Step 3: Define embeddings before using
      const embeddings = new OllamaEmbeddings({
        model: "nomic-embed-text",
        baseUrl: "http://localhost:11434",
      });

      // Step 4: Create or connect to Qdrant collection
      const vectorStore = await QdrantVectorStore.fromDocuments(
        splitDocs,
        embeddings,
        {
          url: "http://localhost:6333",
          collectionName: "pdf-uplodes",
        }
      );

      console.log("✅ Documents successfully added to Qdrant!");
    } catch (err) {
      console.error("❌ Error processing job:", err);
    }
  },
  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: "6379",
    },
  }
);

console.log("Worker started and listening for jobs...");
