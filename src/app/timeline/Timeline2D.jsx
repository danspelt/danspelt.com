'use client';

import React from 'react';
import { motion } from 'framer-motion';

const events = [
  {
    title: "Web Developer at Neil Squire Society",
    date: "June 2021 - March 2024",
    color: "#3b82f6",
    isLeft: true,
    description: "Led the development of assistive technology solutions, focusing on accessibility and user empowerment.",
    achievements: [
      "Led development of LipSync Connect App using Next.js and React",
      "Implemented WebUSB API for direct device communication",
      "Created accessible UI components with ARIA compliance",
      "Developed real-time device configuration system"
    ],
    technologies: ["Next.js", "React", "TypeScript", "WebUSB", "Tailwind CSS", "Node.js"]
  },
  {
    title: "Full Stack Developer at Youneeq AI",
    date: "March 2022 - December 2023",
    color: "#10b981",
    isLeft: false,
    description: "Developed AI-powered content recommendation systems and analytics dashboards for digital publishers.",
    achievements: [
      "Built visualization dashboard using MERN stack",
      "Implemented real-time analytics with WebSocket",
      "Designed RESTful APIs for data aggregation",
      "Optimized database queries for large datasets"
    ],
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Material-UI", "Chart.js"]
  },
  {
    title: "Full Stack Engineer at CanAssist",
    date: "May 2015 - June 2021",
    color: "#f97316",
    isLeft: true,
    description: "Created innovative assistive technology solutions at the University of Victoria's CanAssist program.",
    achievements: [
      "Developed TeenWork employment tracking system",
      "Created CanAssist's client management system",
      "Implemented automated reporting system",
      "Led migration to cloud infrastructure"
    ],
    technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "AWS", "Bootstrap"]
  },
  {
    title: "Information Technology Developer",
    date: "March 2013 - May 2015",
    color: "#8b5cf6",
    isLeft: false,
    description: "Focused on internal tools and systems development for improved operational efficiency.",
    achievements: [
      "Built inventory management system",
      "Automated data backup procedures",
      "Developed staff scheduling system",
      "Created technical documentation platform"
    ],
    technologies: ["Python", "Django", "PostgreSQL", "jQuery", "Git", "Linux"]
  },
  {
    title: "Technology Assistant at CanAssist",
    date: "March 2010 - March 2013",
    color: "#14b8a6",
    isLeft: true,
    description: "Provided technical support and development assistance for assistive technology projects.",
    achievements: [
      "Supported development of assistive devices",
      "Maintained technical documentation",
      "Assisted with user testing sessions",
      "Contributed to project planning"
    ],
    technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL", "SVN", "Arduino"]
  }
];

function TimelineCard({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: event.isLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`flex ${event.isLeft ? 'flex-row' : 'flex-row-reverse'} items-center gap-16 w-full`}
    >
      <div className={`w-[45%] ${event.isLeft ? 'text-right' : 'text-left'}`}>
        <motion.div 
          className="p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          style={{ 
            backgroundColor: event.color + '10', 
            borderLeft: `6px solid ${event.color}`,
            backdropFilter: 'blur(8px)'
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-3 text-foreground">{event.title}</h3>
          <p className="text-base text-muted-foreground mb-4">{event.date}</p>
          <p className="text-base leading-relaxed mb-6">{event.description}</p>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Key Achievements</h4>
            <ul className={`space-y-2 text-sm ${event.isLeft ? 'text-right' : 'text-left'}`}>
              {event.achievements.map((achievement, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-base">• {achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2 justify-end">
              {event.technologies.map((tech, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ 
                    backgroundColor: event.color + '20',
                    color: event.color
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="relative w-[10%] flex justify-center">
        <div 
          className="absolute h-0.5 bg-current w-full"
          style={{ 
            backgroundColor: event.color,
            opacity: 0.8
          }} 
        />
      </div>
      <div className="w-[45%]" />
    </motion.div>
  );
}

export default function Timeline2D() {
  return (
    <div className="max-w-[90rem] mx-auto py-16 px-6 relative">
      {/* Main vertical timeline line with gradient */}
      <div 
        className="absolute left-1/2 top-0 bottom-0 w-1.5 transform -translate-x-1/2"
        style={{
          background: `linear-gradient(to bottom, ${events.map(e => e.color).join(', ')})`,
          opacity: 0.8
        }}
      />
      
      <div className="space-y-32">
        {events.map((event, index) => (
          <TimelineCard 
            key={index} 
            event={event} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
