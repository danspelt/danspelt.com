import "./globals.css";
import { Figtree, Fraunces } from "next/font/google";
import Link from "next/link";
import { ClientWrapper } from "@/components/client-wrapper";
import { Providers } from "@/components/providers";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});


export const metadata = {
  metadataBase: new URL("https://danspelt.com"),
  title: {
    default: "Dan Spelt — Senior Full-Stack Engineer & Accessibility Specialist",
    template: "%s | Dan Spelt",
  },
  description:
    "Senior Full-Stack Engineer based in Victoria, BC. 18+ years building secure, scalable, accessibility-first web platforms. Open to remote senior roles and practical custom software projects worldwide.",
  keywords: [
    "Senior Full Stack Engineer",
    "Accessibility Engineer",
    "WCAG Compliance",
    "ADA Compliance",
    "Custom Software",
    "Remote Senior Developer",
    "React",
    "Next.js",
    "Node.js",
    "Web Accessibility",
    "Victoria BC Canada",
    "Public Sector Web Development",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://danspelt.com",
    siteName: "Dan Spelt",
    title: "Dan Spelt — Senior Full-Stack Engineer & Accessibility Specialist",
    description:
      "Accessible web systems, lived WCAG expertise, and practical custom software from Victoria, BC.",
    images: [
      {
        url: "/images/dan.jpeg",
        width: 800,
        height: 800,
        alt: "Dan Spelt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dan Spelt — Senior Full-Stack Engineer & Accessibility Specialist",
    description:
      "Accessible web systems, lived WCAG expertise, and practical custom software from Victoria, BC.",
    images: ["/images/dan.jpeg"],
  },
  alternates: {
    canonical: "https://danspelt.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased font-sans">

        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to main content
          </a>
          <div className="bg-dots" aria-hidden="true" />
          <div className="bg-waves" aria-hidden="true" />
          <div className="bg-gradient-anim" aria-hidden="true" />
          <div className="relative z-50">
            <ClientWrapper />
          </div>
          <main id="main-content" className="flex-1 relative z-0">
            {children}
          </main>
          <footer className="border-t py-10 mt-16 relative z-10">
            <div className="container mx-auto px-4 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <p className="font-display text-base text-foreground">
                  Dan Spelt
                </p>
                <nav
                  aria-label="Footer"
                  className="flex items-center gap-4 flex-wrap justify-center"
                >
                  <Link
                    href="/custom-software"
                    className="hover:text-foreground transition-colors"
                  >
                    Have a Business Challenge?
                  </Link>
                  <Link
                    href="/ai-chat"
                    className="hover:text-foreground transition-colors"
                  >
                    AI Chat
                  </Link>
                  <Link
                    href="/faq"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                  <a
                    href="https://github.com/danspelt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dan-spelt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="mailto:danspelt24@gmail.com"
                    className="hover:text-foreground transition-colors"
                  >
                    danspelt24@gmail.com
                  </a>
                </nav>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Dan Spelt. Victoria, BC —
                remote worldwide.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
