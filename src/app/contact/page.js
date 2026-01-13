'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const ContactCard = ({ icon: Icon, title, content, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onMouseMove={(e) => {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia?.("(pointer: fine)").matches) return;

      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--tilt-x", `${x.toFixed(0)}px`);
      el.style.setProperty("--tilt-y", `${y.toFixed(0)}px`);

      const px = (x / rect.width) * 2 - 1;
      const py = (y / rect.height) * 2 - 1;

      const max = 8;
      const ry = px * max;
      const rx = -py * max;

      el.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.setProperty("--tilt-rx", "0deg");
      el.style.setProperty("--tilt-ry", "0deg");
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.setProperty("--tilt-rx", "0deg");
      el.style.setProperty("--tilt-ry", "0deg");
    }}
    className="tilt-card flex items-center space-x-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all bg-white dark:bg-gray-800 group"
    variants={fadeIn}
  >
    <div className="p-3 rounded-full border border-blue-200 dark:border-blue-700 bg-transparent group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors">
      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  </motion.a>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you have a project in mind or just want to chat about technology,
            I'm always excited to collaborate and share ideas.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto space-y-6">
          <ContactCard
            icon={Mail}
            title="Email Me"
            content="danspelt24@gmail.com"
            href="mailto:danspelt24@gmail.com"
          />
          <ContactCard
            icon={MapPin}
            title="Based in"
            content="Victoria, BC, Canada"
            href="https://www.google.com/maps/place/Victoria,+BC/@48.4262362,-123.376775,12z"
          />
        </div>
      </div>
    </div>
  );
}
