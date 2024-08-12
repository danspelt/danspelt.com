import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const SkillsTools = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="h-screen w-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className="flex">
          <div className="flex w-full">
            <TabList className="flex flex-col mr-4 border-r-2 border-gray-300 gap-4 text-xl h-full">
              <Tab className={`p-4 cursor-pointer ${tabIndex === 0 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Front-end</Tab>
              <Tab className={`p-4 cursor-pointer ${tabIndex === 1 ? 'bg-red-700 text-white' : 'bg-red-500 text-white hover:bg-red-600'}`}>Back-end</Tab>
              <Tab className={`p-4 cursor-pointer ${tabIndex === 2 ? 'bg-green-700 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}>DevOps & Tools</Tab>
              <Tab className={`p-4 cursor-pointer ${tabIndex === 3 ? 'bg-purple-700 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'}`}>Others</Tab>
            </TabList>

            <div className="bg-white text-xl p-8 rounded-lg shadow-lg flex-grow">
              <TabPanel>
                <div>
                  <h2 className="text-2xl font-bold mb-4">JavaScript & Frameworks</h2>
                  <ul className="list-disc list-inside ml-4">
                    <li>Expertise in modern JavaScript (ES6+), including async programming, closures, and modular code.</li>
                    <li>Proficient in React.js and Next.js for building dynamic, high-performance web applications.</li>
                    <li>Experience with state management libraries like Redux and MobX.</li>
                    <li>Advanced skills in TypeScript for writing type-safe JavaScript.</li>
                  </ul>
                  <h2 className="text-2xl font-bold mt-8 mb-4">HTML & CSS</h2>
                  <ul className="list-disc list-inside ml-4">
                    <li>Extensive experience with semantic HTML5 and modern CSS, including Flexbox and Grid.</li>
                    <li>Proficient in CSS frameworks like Tailwind CSS and Bootstrap for responsive design.</li>
                    <li>Experience with CSS-in-JS libraries such as Emotion and styled-components.</li>
                  </ul>
                </div>
              </TabPanel>

              <TabPanel>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Server-side Development</h2>
                  <ul className="list-disc list-inside ml-4">
                    <li>Proficient in Node.js and Express.js for building scalable back-end services.</li>
                    <li>Experience with RESTful API design and GraphQL for efficient data fetching.</li>
                    <li>Skilled in database management with MongoDB, PostgreSQL, and MySQL.</li>
                    <li>Familiar with server-side rendering (SSR) techniques using Next.js.</li>
                  </ul>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Security & Performance</h2>
                  <ul className="list-disc list-inside ml-4">
                    <li>Implemented security best practices, including JWT authentication and OAuth.</li>
                    <li>Experience with performance optimization techniques like caching, lazy loading, and CDN usage.</li>
                  </ul>
                </div>
              </TabPanel>

              <TabPanel>
                <div>
                  <h2 className="text-2xl font-bold mb-4">DevOps & Tooling</h2>
                  <ul className="list-disc list-inside ml-4">
                    <li>Proficient with cloud platforms like AWS and Google Cloud for deploying scalable applications.</li>
                    <li>Experience with Docker and Kubernetes for containerization and orchestration.</li>
                    <li>Skilled in CI/CD pipelines using Jenkins, GitHub Actions, and CircleCI.</li>
                    <li>Version control expertise with Git, GitHub, and BitBucket.</li>
                  </ul>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Monitoring & Logging</h2>
                  <ul className="list-disc list-inside ml-4">
                    <li>Experience with monitoring tools like DataDog and Prometheus for application performance.</li>
                    <li>Logging and error tracking using tools like Sentry and ELK Stack (Elasticsearch, Logstash, Kibana).</li>
                  </ul>
                </div>
              </TabPanel>

              <TabPanel>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Other Skills & Technologies</h2>
                  <ul className="list-disc list-inside ml-4">
                    <li>Proficient in building and deploying Chrome Extensions.</li>
                    <li>Experience with headless CMS platforms like Contentful and Strapi.</li>
                    <li>Search engine optimization (SEO) and UI/UX prototyping.</li>
                    <li>Agile methodologies and Scrum framework for efficient project management.</li>
                  </ul>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Soft Skills</h2>
                  <ul className="list-disc list-inside ml-4">
                    <li>Strong communication and collaboration skills within cross-functional teams.</li>
                    <li>Mentorship and leadership experience, guiding junior developers.</li>
                    <li>Continuous learning mindset, staying updated with industry trends and best practices.</li>
                  </ul>
                </div>
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillsTools;