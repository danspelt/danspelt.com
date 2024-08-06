import React, { useState } from 'react';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What accommodations do I need in the workplace?",
      answer: "I do not require any special upfront costs for accommodations if the job is remote. I have my own keyboard and all necessary accessibility technology to perform my job effectively."
    },
    {
      question: "How does cerebral palsy affect my daily work routine?",
      answer: "Cerebral palsy affects my motor skills, requiring me to use adaptive devices for typing and navigating the computer. I may need additional time for certain tasks due to the physical limitations imposed by my condition. Despite these challenges, I have successfully managed full-time roles and complex projects."
    },
    {
      question: "Can I work full-time hours?",
      answer: "Yes, I can work full-time hours and have demonstrated the ability to handle demanding schedules and responsibilities effectively."
    },
    {
      question: "What types of tasks am I proficient in?",
      answer: "I am highly skilled in full-stack web development, including JavaScript, TypeScript, Next.js, React, MongoDB, Firebase, and other technologies. I have experience leading development projects, improving UI/UX, optimizing website performance, and ensuring accessibility compliance."
    },
    {
      question: "How do I handle communication and collaboration with colleagues?",
      answer: "I effectively communicate and collaborate with colleagues using digital tools like Slack and Wrike. My proficiency with technology enables seamless interaction in a professional setting, facilitating effective team collaboration."
    },
    {
      question: "What are the legal requirements for hiring me?",
      answer: "Under the ADA, employers must provide reasonable accommodations and cannot discriminate based on disability. Employers should focus on Dan's qualifications and ability to perform essential job functions with or without reasonable accommodation."
    },
    {
      question: "What benefits does hiring me bring to the team?",
      answer: "Hiring me brings diversity and a unique perspective to the team. My experience with adaptive technologies can also inspire innovative solutions for accessibility within the company. My expertise in web development and my dedication to improving user experience for individuals with disabilities are significant assets."
    },
    {
      question: "How can the workplace be made more accessible for me?",
      answer: "Ensuring that the workplace has accessible facilities, adaptive technology support, and a flexible work environment will help accommodate my needs. Providing a supportive and understanding team culture is also crucial."
    },
    {
      question: "What support do I need for professional development?",
      answer: "I benefit from ongoing training in new technologies and adaptive tools. Access to professional development opportunities and resources tailored to my needs will support my career growth. Encouraging participation in workshops and courses related to my field can enhance my skills further."
    },
    {
      question: "What should be considered during the hiring process?",
      answer: "During the hiring process, focus on my skills, experience, and qualifications. Ensure that interviews and assessments are accessible and be prepared to discuss and implement reasonable accommodations."
    }
  ];

  return (
    <div className="opacity-80">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions Regarding Dan Spelt's Professional Capabilities and Requirements</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-lg mb-4 opacity-80 text-yellow-900">
          <h3 
            className="text-xl font-semibold cursor-pointer"
            onClick={() => toggleFaq(index)}
          >
            {faq.question}
          </h3>
          {openIndex === index && (
            <p className="mt-2 text-yellow-700">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faqs;