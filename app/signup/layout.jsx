
import { SignupProvider } from '@contexts/SignUpContext';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center h-screen bg-neutral-100">
        <SignupProvider>
          {children}
        </SignupProvider>
      </body>
    </html>
  )
}
