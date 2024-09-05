import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import SendEmailForm from "@/components/SendEmailForm";


function ContactForm() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <div className="flex flex-col gap-6">
        <p className="text-4xl font-extrabold text-blue-900">Contact Information</p>
        <p className="text-2xl text-slate-800 flex items-center gap-4">
          <FaEnvelope className="text-blue-900" />
          Email:
          <Link href="mailto:dan@danspelt.com" className="text-blue-700 hover:text-blue-800"> dan@danspelt.com</Link>
        </p>
        <p className="text-2xl text-slate-800 flex items-center gap-4">
          <FaPhone className="text-blue-900" />
          Phone: <span className="text-blue-700">+1 250-208-7997</span>
        </p>
        <div className="flex gap-12 text-slate-800 text-2xl">
          <Link href="https://www.linkedin.com/in/dan-spelt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
            <FaLinkedin className="text-blue-900" />
            LinkedIn
          </Link>
          <Link href="https://github.com/danspelt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
            <FaGithub className="text-slate-900" />
            GitHub
          </Link>
        </div>
      </div>
      <SendEmailForm />
    </div>
  );
}


export default ContactForm;
