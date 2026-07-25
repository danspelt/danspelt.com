'use client';

import { motion, useReducedMotion } from 'framer-motion';

const events = [
  {
    title: 'Founder & Developer — AccessLens',
    date: 'May 2026 - Present',
    color: '#0f766e',
    description:
      'Building an accessibility intelligence platform for cities — crowdsourced accessibility data, interactive mapping, and community reviews to help people with disabilities navigate urban environments.',
    achievements: [
      'Architected multi-collection MongoDB data model with 2dsphere geospatial indexing',
      'Built accessibility scoring system across 10 criteria with colour-coded map markers',
      'Integrated Auth.js with Google OAuth, email magic link, and credential sign-in',
      'Seeded 50+ real verified places in Victoria, BC for production launch',
      'Deployed via Docker with standalone Next.js output and health monitoring',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'MongoDB',
      'Auth.js',
      'Leaflet',
      'Tailwind CSS',
      'Docker',
      'Zod',
    ],
  },
  {
    title: 'Founder & Developer — Community Hive',
    date: 'January 2025 - April 2026',
    color: '#c2763a',
    description:
      'Building a multi-tenant SaaS platform that centralizes communication for strata councils, HOA boards, and property managers — replacing fragmented email chains and paper notices with a secure, structured system.',
    achievements: [
      'Architected multi-tenant system with per-building unit hierarchies',
      'Implemented role-based dashboards for managers, councils, and residents',
      'Built structured issue tracking and automated announcement workflows',
      'Self-hosted on Coolify with Docker for full infrastructure control',
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Docker', 'Coolify'],
  },
  {
    title: 'Web Developer at Neil Squire Society',
    date: 'June 2021 - March 2024',
    color: '#1d4ed8',
    description:
      'Led the development of assistive technology solutions, focusing on accessibility and user empowerment.',
    achievements: [
      'Led development of LipSync Connect App using Next.js and React',
      'Implemented WebUSB API for direct device communication',
      'Created accessible UI components with ARIA compliance',
      'Developed real-time device configuration system',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'WebUSB', 'Tailwind CSS', 'Node.js'],
  },
  {
    title: 'Full Stack Developer at Youneeq AI',
    date: 'March 2022 - December 2023',
    color: '#047857',
    description:
      'Developed AI-powered content recommendation systems and analytics dashboards for digital publishers.',
    achievements: [
      'Built visualization dashboard using MERN stack',
      'Implemented real-time analytics with WebSocket',
      'Designed RESTful APIs for data aggregation',
      'Optimized database queries for large datasets',
    ],
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Material-UI', 'Chart.js'],
  },
  {
    title: 'Full Stack Engineer at CanAssist',
    date: 'May 2015 - June 2021',
    color: '#b45309',
    description:
      "Created innovative assistive technology solutions at the University of Victoria's CanAssist program.",
    achievements: [
      'Developed TeenWork employment tracking system',
      "Created CanAssist's client management system",
      'Implemented automated reporting system',
      'Led migration to cloud infrastructure',
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'AWS', 'Bootstrap'],
  },
  {
    title: 'Information Technology Developer',
    date: 'March 2013 - May 2015',
    color: '#0e7490',
    description:
      'Focused on internal tools and systems development for improved operational efficiency.',
    achievements: [
      'Built inventory management system',
      'Automated data backup procedures',
      'Developed staff scheduling system',
      'Created technical documentation platform',
    ],
    technologies: ['Python', 'Django', 'PostgreSQL', 'jQuery', 'Git', 'Linux'],
  },
  {
    title: 'Technology Assistant at CanAssist',
    date: 'March 2010 - March 2013',
    color: '#115e59',
    description:
      'Provided technical support and development assistance for assistive technology projects.',
    achievements: [
      'Supported development of assistive devices',
      'Maintained technical documentation',
      'Assisted with user testing sessions',
      'Contributed to project planning',
    ],
    technologies: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL', 'SVN', 'Arduino'],
  },
];

function TimelineCard({ event, index, reduce }) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: reduce ? 0 : Math.min(index * 0.08, 0.4) }}
      className="relative pl-8 md:pl-0"
    >
      <div
        className="absolute left-0 top-3 h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2 border-2 border-background"
        style={{ backgroundColor: event.color }}
        aria-hidden="true"
      />
      <div
        className={`md:w-[calc(50%-2rem)] ${
          index % 2 === 0 ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'
        }`}
      >
        <div
          className="rounded-xl border border-border/80 bg-card/80 p-6 sm:p-8 backdrop-blur-sm"
          style={{ borderLeftWidth: 4, borderLeftColor: event.color }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-1 text-foreground">
            {event.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">{event.date}</p>
          <p className="text-sm sm:text-base leading-relaxed mb-5 text-foreground/90">
            {event.description}
          </p>

          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Key achievements
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground mb-5">
            {event.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-2">
                <span aria-hidden="true" style={{ color: event.color }}>
                  •
                </span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {event.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs rounded-md"
                style={{
                  backgroundColor: `${event.color}18`,
                  color: event.color,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Timeline2D() {
  const reduce = useReducedMotion();

  return (
    <div className="relative max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div
        className="absolute left-[5px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
        style={{
          background: `linear-gradient(to bottom, ${events.map((e) => e.color).join(', ')})`,
          opacity: 0.55,
        }}
        aria-hidden="true"
      />

      <div className="space-y-10 md:space-y-14">
        {events.map((event, index) => (
          <TimelineCard key={event.title} event={event} index={index} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}
