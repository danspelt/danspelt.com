import { Noto_Sans_JP, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-roboto",
});
export const metadata = {
  title: "danspelt.com",
  description: "Dan Spelt visual ai resume"
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className={roboto.className}>{children}</body>
    </html>
  );

}
