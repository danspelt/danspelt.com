import "./globals.css";

import { ChatProvider } from "./hooks/useChatAi";
import { mp3ToWavToJson, createMp3FromText, deleteAllAiFiles } from "./lib/aiUtils";

export default function RootLayout({ children }) {
  //createMp3FromText("Hello", "8Z4Qc0D");
  //mp3ToWavToJson("8Z4Qc0D");
  deleteAllAiFiles();
  return (
    <html lang="en">
      <body className="h-screen w-screen"></body>
    </html>
  );
}
