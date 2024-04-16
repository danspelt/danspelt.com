
import './globals.css';

import { ChatProvider } from './hooks/useChat';
export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-sky-400">
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  )
}
