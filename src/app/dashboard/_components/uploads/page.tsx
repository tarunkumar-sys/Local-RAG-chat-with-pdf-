import FileUpload from "../file-upload";
import ChatComponent from "../file-uploadschat";
import { Button } from "@/components/ui/button";
//  this is for backend...
export default function Uploads() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      {/* <Button className="mt-2 ml-5">Back</Button> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-[calc(100vh-2.5rem)]">
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <FileUpload />
        </div>
        <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-4 flex flex-col">
          {/* Right screen content goes here */}
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}
