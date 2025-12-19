import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { Queue } from "bullmq";

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const queue = new Queue("file-upload-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

// Helper to run multer
function runMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    // Note: Next.js API routes don't directly support multer like Express.
    // For simplicity, we'll use a different approach or keep it simple.
    // Since the original used FormData, we can handle it manually.

    const formData = await request.formData();
    const file = formData.get("pdf") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file to uploads/
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const path = `uploads/${filename}`;

    // Write file
    const fs = require("fs");
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    fs.writeFileSync(path, buffer);

    // Add to queue
    await queue.add(
      "file-ready",
      JSON.stringify({
        filename: file.name,
        destination: "uploads/",
        path: path,
      })
    );

    return NextResponse.json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
