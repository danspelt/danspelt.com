import './globals.css';

import { ChatProvider } from './hooks/useChat';

export const metadata = {
  title: 'Dan Spelt - Full Stack Developer',
  description: 'Get to know Dan Spelt, a full stack developer with a passion for learning and creating.',  
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center bg-neutral-100">
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  )
}
