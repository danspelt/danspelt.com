import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const Home = () => {
  const fs = require("fs");
  const path = require("path");
  const filePathExperiences = path.join(
    process.cwd(),
    "public",
    "experiences.txt"
  );
  const filePathEducation = path.join(process.cwd(), "public", "education.txt");
  const filePathSkills = path.join(process.cwd(), "public", "skills.txt");
  const filePathInterests = path.join(process.cwd(), "public", "interests.txt");
  const filePathBio = path.join(process.cwd(), "public", "bio.txt");

  const dataExperiences = fs.readFileSync(filePathExperiences, "utf8");
  const dataEducation = fs.readFileSync(filePathEducation, "utf8");
  const dataSkills = fs.readFileSync(filePathSkills, "utf8");
  const dataInterests = fs.readFileSync(filePathInterests, "utf8");
  const dataBio = fs.readFileSync(filePathBio, "utf8");
  // Parse the data into a usable format
  const experiences = dataExperiences.split("\n").map((line) => {
    const parts = line.split(", ");
    return { company: parts[0], role: parts[1], duration: parts[2] };
  });
  const education = dataEducation.split("\n").map((line) => {
    const parts = line.split(", ");
    return { school: parts[0], degree: parts[1], duration: parts[2] };
  });
  const skills = dataSkills.split("\n").map((line) => {
    const parts = line.split(", ");
    return { skill: parts[0], proficiency: parts[1] };
  });
  const interests = dataInterests.split("\n").map((line) => {
    const parts = line.split(", ");
    return { interest: parts[0] };
  });
  const bio = dataBio.split("\n").map((line) => {
    return line;
  });

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">
        Dan Spelt - Full Stack Developer
      </h1>
      <div className="card text-xl m-4"> 
        {bio.map((line, index) => {
          return <p key={index}>{line}</p>;
        })}
      </div>
      <div className="card text-xl m-4">
        <h1 className="text-xl text-center">Skills</h1>
        <ul>
          {skills.map((skill, index) => {
            return (
              <li key={index} className="bg-gray-100 p-5 rounded-3xl">
                {skill.skill} - {skill.proficiency}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="card text-xl m-4">
        <h1 className="text-xl text-center">Experience</h1>
        <article>
          {experiences.map((experience, index) => {
            return (
              <div key={index} className="mb-4 bg-gray-100 p-5 rounded-3xl">
                <h3>{experience.company}</h3>
                <p>{experience.role}</p>
                <p>{experience.duration}</p>
              </div>
            );
          })}
        </article>
      </div>
      <div className="card text-xl m-4">
        <h2>Projects</h2>
        {/* List your projects here */}
        <article>
          <h3>Project Name</h3>
          <p>
            Brief description of the project, the problem it solved, and
            technologies used.
          </p>
        </article>
        {/* Add more projects as needed */}
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div class="flex w-full justify-around">
          <Link
            href="mailto:danspelt24@gmail.com"
            className="flex flex-col text-blue-500 items-center no-underline"
          >
            <AiOutlineMail size={20} className="mr-2" />
            danspelt24@gmail.com
          </Link>
          <Link
            className="flex flex-col text-blue-500 items-center no-underline"
            href="tel:1-250-208-7997"
          >
            <FaPhoneAlt size={20} className="mr-2" />
            +1 250-208-7997
          </Link>

          <Link
            href="https://www.linkedin.com/in/dan-spelt/"
            className="flex flex-col text-blue-500 items-center no-underline"
            target="_blank"
            rel="noopener"
          >
            <FaLinkedin size={20} className="mr-2" />
            LinkedIn
          </Link>
          <Link
            href="https://github.com/danspelt"
            className="flex flex-col text-blue-500 items-center no-underline"
            target="_blank"
            rel="noopener"
          >
            <FaGithub size={20} className="mr-2" />
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
