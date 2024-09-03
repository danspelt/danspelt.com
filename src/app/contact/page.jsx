"use client";

import { useRef, useTransition } from "react";
import toast from "react-hot-toast";
import { sendContactEmailAction } from "@/actions";
import { FaUser, FaEnvelope, FaPaperPlane, FaLinkedin, FaGithub } from "react-icons/fa";

function ContactForm() {
  const formRef = useRef(null);

  const [isPending, startTransition] = useTransition();

  const handleSubmitContactForm = (formData) => {
    startTransition(async () => {
      const { errorMessage } = await sendContactEmailAction(formData);
      if (!errorMessage) {
        toast.success("Message sent!");
        formRef.current?.reset();
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">Contact</p>
          <p className="text-sm text-slate-700">
            Email: dan@danspelt.com
          </p>
          <p className="text-sm text-slate-700">
            Phone: +1 250-208-7997
          </p>
          <div className="flex gap-8 text-slate-700 text-xl">
            <a href="https://www.linkedin.com/in/danspelt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <FaLinkedin className="text-slate-800" />
              LinkedIn
            </a>
            <a href="https://github.com/danspelt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <FaGithub className="text-slate-800" />
              GitHub
            </a>
          </div>
      </div>
      <form
      ref={formRef}
      onSubmit={(e) => {
        
        e.preventDefault();
        const formData = new FormData(formRef.current);
        handleSubmitContactForm(formData);
      }}
      className="rounded-lg bg-slate-200 p-6 shadow-md"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <FaUser className="text-slate-800" />
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="rounded-md p-2 text-black flex-1 border-2 border-slate-800"
            disabled={isPending}
          />
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-slate-800" />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="rounded-md p-2 text-black flex-1 border-2 border-slate-800"

            disabled={isPending}
          />
        </div>
        <div className="flex items-center gap-2">
          <FaPaperPlane className="text-slate-800" />
          <textarea
            name="message"
            placeholder="Message"
            className="rounded-md p-2 min-h-40 text-black flex-1 border-2 border-slate-800"
            disabled={isPending}
          />
        </div>
        <button
          type="submit"
          className="w-48 rounded-lg bg-slate-800 py-2 ml-auto text-white"
          disabled={isPending}
        >
          Send Message
        </button>
      </div>
    </form>
  
    </div>
  );
}


export default ContactForm;
