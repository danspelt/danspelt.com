import "./globals.css";

import Topbar from "@/components/Topbar";


export const metadata = {
  title: "danspelt.com",
  description: "Dan Spelt visual ai resume"
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Topbar />
          {children}
        
      </body>
    </html>
  );

}
