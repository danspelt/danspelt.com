'use client';
import React, { useState } from "react";
import Image from "next/image";

const About = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const sections = [
        {
            title: "Transforming Challenges into Innovation",
            content: "Greetings, I'm Dan Spelt, a seasoned full-stack web developer with over 18 years of experience in crafting robust, scalable, and user-centric applications. My extensive journey in the tech industry is a testament to my skills, determination, and ability to overcome challenges."
        },
        {
            title: "Living with Cerebral Palsy",
            content: "Born with cerebral palsy, a condition affecting muscle coordination and mobility, I have faced unique challenges throughout my life. However, this has never hindered my passion for technology or my ability to excel in web development. Instead, it has fueled my drive to innovate and find creative solutions to complex problems. My condition has instilled in me resilience, adaptability, and a profound understanding of the importance of accessibility in technology—skills that are integral to my work as a developer."
        },
        {
            title: "Professional Perspective on Accessibility",
            content: "My cerebral palsy does not define my professional capabilities. It has provided me with a unique perspective on accessibility and inclusivity, which I incorporate into every project. I have developed tools and techniques to optimize my work environment for productivity. My expertise in accessible design is not just theoretical; it is born out of personal experience. I understand the importance of creating websites and applications that are accessible to everyone, regardless of their abilities. I have led the development of several high-impact projects, including a Next.js app designed to enhance device accessibility and a comprehensive visualization dashboard using the MERN stack. My ability to collaborate with cross-functional teams, coupled with my technical expertise, has consistently resulted in the successful delivery of projects that meet both business and user needs."
        },
        {
            title: "Commitment to Accessibility and Diversity",
            content: "My commitment to accessibility extends beyond compliance; it is about creating genuinely inclusive experiences. I have implemented WCAG 2.0 standards in various projects, resulting in improved accessibility compliance and enhanced user experiences for individuals with disabilities. Additionally, I have spearheaded diversity initiatives that have led to increased applications from underrepresented groups, further contributing to an inclusive tech environment."
        },
        {
            title: "Why Collaborate with Me?",
            content: "Choosing to collaborate with me means partnering with a professional who is not only skilled but also deeply committed to making technology accessible to all. My condition has never been a limitation; instead, it has been a source of inspiration, driving me to push the boundaries of what is possible in web development. I bring a unique blend of technical expertise, real-world experience, and a relentless drive to create solutions that empower users and clients alike. Whether you are seeking a senior developer to lead a complex project or a partner who understands the nuances of accessibility and diversity, I am confident that my skills and experiences will make a valuable contribution to your team. Let us collaborate to build something extraordinary together."
        }
    ];

    return (
        <div className="p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
            <Image
                src="/images/dan.jpeg"
                alt="Dan Spelt"
                width={200}
                height={200}
                className="rounded-xl mb-4 hover:scale-105 transition-all duration-300"
            />
            {sections.map((section, index) => (
                <div key={index} className="w-full mb-4">
                    <h3
                        className="text-xl font-semibold mb-2 text-red-900 cursor-pointer"
                        onClick={() => toggleSection(index)}
                    >
                        {section.title}
                    </h3>
                    {openIndex === index && (
                        <p className="text-lg p-4">{section.content}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default About;
