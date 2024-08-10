import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const SkillsTools = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-blue-900">Skills & Tools</h2>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <div className="flex">
          <TabList className="flex flex-col mr-4 border-r-2 border-gray-300 gap-4 text-xl">
            <Tab className={`p-2 cursor-pointer ${tabIndex === 0 ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}>Front-end</Tab>
            <Tab className={`p-2 cursor-pointer ${tabIndex === 1 ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}>Back-end</Tab>
            <Tab className={`p-2 cursor-pointer ${tabIndex === 2 ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}>Others</Tab>
          </TabList>

          <div className="bg-slate-50 text-xl">
            <TabPanel>
              <div className="mb-6">
                <p className="text-lg font-semibold text-black mt-2">JavaScript</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Single-page Applications (SPA)</li>
                  <li>ES6, React, TypeScript, Next.js</li>
                  <li>Webpack, GraphQL, D3.js, Leaflet, Mapbox, Redux, MobX</li>
                  <li>Web3 (ethers.js)</li>
                </ul>
                <p className="text-lg font-semibold text-black mt-4">HTML & CSS</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Responsive websites, Tailwind, CSS-in-JS (Emotion, styled-components, Material UI)</li>
                  <li>SASS, Material UI, Bootstrap</li>
                </ul>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mb-6">
                <ul className="list-disc list-inside ml-4">
                  <li>Node.js, Express.js, Koa.js, Knex, PostgreSQL, MySQL, MongoDB</li>
                  <li>Amazon Web Services (AWS), DataDog, Heroku, Firebase</li>
                  <li>Third-party APIs (Facebook, Twitter, YouTube, GitHub, etc.)</li>
                </ul>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mb-6">
                <ul className="list-disc list-inside ml-4">
                  <li>Chrome Extensions, DevOps, Headless CMS (Contentful, Prismic, Strapi)</li>
                  <li>Search engine optimization (SEO), UI Prototyping, Designing RESTful APIs</li>
                </ul>
              </div>
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SkillsTools;