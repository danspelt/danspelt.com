import "./globals.css";
import { Inter } from "next/font/google";
import { ClientWrapper } from "@/components/client-wrapper";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: {
    default: "Dan Spelt — Senior Full-Stack Engineer & Accessibility Specialist",
    template: "%s | Dan Spelt",
  },
  description:
    "Senior Full-Stack Engineer with 18+ years building secure, scalable, accessibility-first web platforms. WCAG 2.0/2.1 compliance specialist. Open to remote senior roles and government contracts.",
  keywords: [
    "Senior Full Stack Engineer",
    "Accessibility Engineer",
    "WCAG Compliance",
    "ADA Compliance",
    "Government Contracts",
    "Remote Senior Developer",
    "React",
    "Next.js",
    "Node.js",
    "Web Accessibility",
    "Screen Reader Compatibility",
    "Victoria BC",
    "Public Sector Web Development",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <ClientWrapper />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-8 mt-16">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Dan Spelt. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/danspelt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/danspelt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:dan@danspelt.com"
                  className="hover:text-foreground transition-colors"
                >
                  dan@danspelt.com
                </a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
