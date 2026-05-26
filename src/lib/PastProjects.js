const pastProjectsData = [
        {
            id: 5,
            name: "AccessLens",
            company: "Founder & Developer",
            dates: "May 2026 - Present",
            description: `AccessLens is a community-driven accessibility intelligence platform built to help people with disabilities navigate cities. The platform combines crowdsourced accessibility data, interactive mapping, and community reviews to create a comprehensive resource for real-world accessibility information. Built with Next.js 16, TypeScript, MongoDB (with 2dsphere geospatial indexing), and Auth.js supporting Google OAuth, email magic link, and credential authentication. Features include an accessibility scoring system (0-100 across 10 criteria), colour-coded Leaflet/OpenStreetMap markers, place submission and moderation, photo uploads, geocoding with TTL caching, and a structured reporting workflow. Launched with 50+ verified places seeded in Victoria, BC. Deployed via Docker with multi-stage builds and WCAG 2.1 AA compliance throughout.`,
            images: [],
        },
        {
            id: 1,
            name: "Visualization Dashboard",
            company: "Youneeq",
            dates: "May 2020 - Dec 2024",
            description: `At Youneeq, our mission has always been to empower websites with enhanced traffic and engagement. In pursuit of this goal, we've developed the Visualization Dashboard, a cutting-edge tool designed to revolutionize how our clients view and understand their website statistics.

            The Visualization Dashboard is a transformative upgrade from our previous .NET-based dashboard created in 2014. Recognizing the evolving needs of our clients, we embarked on this journey last year to create a more intuitive, efficient, and modern solution.

            MERN Stack: At the core of the Visualization Dashboard is the MERN stack, ensuring a robust, scalable, and agile platform.
            Material-UI (MUI): We've embraced MUI for its sleek and responsive styling capabilities, offering a visually appealing and user-friendly interface.
            Chart.js Integration: Utilizing Chart.js, the dashboard provides stunning visual representations of website statistics, making data analysis both straightforward and insightful.
            Google Sign-In and Local Login: To enhance user convenience and security, the dashboard supports Google Sign-In alongside traditional username and password authentication.
            Enhanced Signup Process: New users are greeted with an intuitive sign-up process, complete with real-time username availability checks and visual password strength indicators. Upon account creation, users receive an activation link via email, ensuring a secure and seamless onboarding experience.

            Our focus has been on simplicity and clarity. The Visualization Dashboard is not just a tool; it's a gateway to understanding web traffic and user engagement through a lens of modern technology and design.

            As we move forward, our commitment is to continuously innovate and adapt to the ever-changing digital landscape. The Visualization Dashboard is just the beginning of a series of advancements we plan to introduce, all aimed at providing our clients with the best possible tools to grow and succeed in the digital world.`,
            images: [
                "/images/youneeq/1.png",
                "/images/youneeq/2.png",
                "/images/youneeq/3.png",
                "/images/youneeq/4.png",
            ],
        },
        {
            id: 2,
            name: "LipSync Connect",
            company: "Neil Squire",
            dates: "June 2021 - March 2024",
            description: `LipSync Connect is a Next.js application designed to enhance device accessibility for individuals with disabilities. The project involved extensive UX/UI design, research, and prototyping, ensuring a user-friendly and customizable experience. The application is built with modern web technologies, including Firebase and MongoDB for data storage and management.`,
            images: [
            ],
        },
        {
            id: 3,
            name: "Assistive Technology Suite",
            company: "CanAssist - University of Victoria",
            dates: "March 2008 - June 2021",
            description: `The Assistive Technology Suite includes various applications designed to improve the quality of life for people with disabilities. Leveraging technologies like React, C#, and MongoDB, these applications were developed to be intuitive, user-friendly, and accessible. The suite integrates social media APIs, allowing seamless interaction with platforms like Facebook and Twitter.`,
            images: [
            ],
        },
        {
            id: 4,
            name: "Community Hive",
            company: "Founder & Developer",
            dates: "June 2024 - April 2026",
            description: `Community Hive is a multi-tenant SaaS platform built to centralize communication between property managers, strata councils, HOA boards, and residents. Designed and developed independently from concept to production, the platform replaces fragmented email chains, paper notices, and social media groups with a secure, structured communication architecture. Features include role-based dashboards, AI-assisted announcement workflows, automated weekly Building Brief digests, a full maintenance and ticketing system, secure document storage with governed access controls, and resident engagement tools including polls and quorum support. Deployed via Docker and Coolify with isolated staging and production environments.`,
            images: [
            ],
        },
];

export default pastProjectsData;