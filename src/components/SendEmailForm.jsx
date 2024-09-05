"use client"
import { useRef, useTransition } from "react";
import toast from "react-hot-toast";
import { sendContactEmailAction } from "@/actions";
import { FaUser, FaEnvelope, FaPaperPlane, FaLinkedin, FaGithub } from "react-icons/fa";

const SendEmailForm = () => {
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
        <form
            ref={formRef}
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(formRef.current);
                handleSubmitContactForm(formData);
            }}
            className="w-full p-8"
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
                        autoFocus
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
                        className="rounded-md p-2 text-black flex-1 border-2 border-slate-800"
                        disabled={isPending}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-slate-800 text-white rounded-md p-2"
                    disabled={isPending}
                >
                    {isPending ? "Sending..." : "Send Message"}
                </button>
            </div>
        </form>
    );
};

export default SendEmailForm;