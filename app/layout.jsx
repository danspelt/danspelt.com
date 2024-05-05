import "./globals.css";

import { ChatProvider } from "./hooks/useChatAi";

export default function RootLayout({ children }) {
  
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
