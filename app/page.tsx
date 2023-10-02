import fs from "fs";
import path from "path";
import Link from "next/link";
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home() {
  const filePath = path.join(process.cwd(), "public", "aboutDan.txt");
  const aboutDanText = fs.readFileSync(filePath, "utf8");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 space-y-8">
      <h1 className="text-5xl font-bold">Dan Spelt</h1>
      <p className="text-3xl">Fullstack Front End Developer</p>
      
      
      <section className="space-y-4 ml-4 mr-8">
        <h2 className="text-3xl">About Me</h2>
        <p>{aboutDanText}</p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-3xl">Hobbies</h2>
        <p>Making games with React Three Fiber</p>
      </section>
      
      <section className="flex gap-4 text-2xl">
        <p>Victoria, BC</p>
        <p>(250) 208 7997</p>
        <div className="flex gap-4">
          <a className="text-blue-500 hover:underline flex items-center gap-2" href="mailto:danspelt24@gmail.com">
            <EmailIcon fontSize="inherit" /> Email
          </a>
          <a className="text-blue-500 hover:underline flex items-center gap-2" href="https://www.linkedin.com/in/dan-spelt-842016179/">
            <LinkedInIcon fontSize="inherit" /> LinkedIn
          </a>
          <a className="text-blue-500 hover:underline flex items-center gap-2" href="https://github.com/danspelt">
            <GitHubIcon fontSize="inherit" /> Github
          </a>
        </div>
      </section>
    </main>
  );
}