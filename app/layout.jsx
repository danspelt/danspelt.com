
import './globals.css';

import { ChatProvider } from './hooks/useChatAi';
import {createMp3FromText} from './lib/aiUtils';

export default function RootLayout({ children }) {
  createMp3FromText('Hello').then((audio) => {
    console.log('audio');
  });

  return (
    <html lang="en">
      <body className="h-screen w-screen">
      t
      </body>
    </html>
  )
}
