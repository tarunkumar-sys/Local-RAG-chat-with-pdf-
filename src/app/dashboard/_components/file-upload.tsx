"use client";
import * as React from "react";
import { Upload, Loader2, CheckCircle, XCircle } from "lucide-react";
//  this is for backend...
const FileUpload: React.FC = () => {
  const [uploading, setUploading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] = React.useState<
    "success" | "error" | null
  >(null);

  const handleFileUploadButtonClick = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "application/pdf");
    el.addEventListener("change", async (ev) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          setUploading(true);
          setMessage(null);
          setMessageType(null);
          const formData = new FormData();
          formData.append("pdf", file);

          try {
            // fetch call to upload the file
            const res = await fetch("/api/upload/pdf", {
              method: "POST",
              body: formData,
            });
            if (res.ok) {
              setMessage("File uploaded successfully!");
              setMessageType("success");
            } else {
              setMessage("Failed to upload file. Please try again.");
              setMessageType("error");
            }
          } catch (error) {
            setMessage(
              "An error occurred while uploading. Please check your connection."
            );
            setMessageType("error");
          } finally {
            setUploading(false);
          }
        }
      }
    });
    el.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <div
        onClick={handleFileUploadButtonClick}
        className={`flex flex-col items-center justify-center w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out ${
          uploading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {uploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        ) : (
          <Upload className="h-8 w-8 text-gray-500" />
        )}
        <h3 className="text-lg font-medium text-gray-700 mt-2">
          {uploading ? "Uploading..." : "Upload PDF File"}
        </h3>
      </div>
      {message && (
        <div
          className={`flex items-center space-x-2 p-2 rounded-md ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {messageType === "success" ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
