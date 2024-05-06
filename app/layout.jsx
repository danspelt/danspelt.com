import "./globals.css";

import { ChatProvider } from "./hooks/useChatAi";
import { readJsonTranscript } from "./lib/aiUtils"

export default function RootLayout({ children }) {
  readJsonTranscript('audios/ai_Yq5uGW3.json').then(transcript => {
    console.log('transcript', transcript)
  })
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}
