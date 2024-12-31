import "./globals.css";
import { ClientWrapper } from "@/components/client-wrapper";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "danspelt.com",
  description: "Dan Spelt visual ai resume"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ClientWrapper />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
