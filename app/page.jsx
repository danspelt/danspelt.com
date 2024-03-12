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
    const category = line.split(": ")[0];
    const languages = line.split(": ")[1].split(", ");
    let skills = [];
    languages.forEach((language) => {   
      skills.push(language.split(" - ")[0]);
    });

    const hasYears = line.split(" - ").length > 1;
    if (hasYears) {
      const years = line.split(" - ")[1].split(", ")[0];
      return {
        category: category,
        skill: skills.join(", "),
        years: years,
      };
    }
  return {
      category: category,
      skill: skills.join(", "),
    };
  });
  const interests = dataInterests.split("\n").map((line) => {
    const parts = line.split(", ");
    return { interest: parts[0] };
  });
  const bio = dataBio.split("\n").map((line) => {
    return line;
  });
  // Project information (Consider fetching from an external source or config for scalability)
  const projects = [
    {
      name: "TaskFlow",
      url: "https://www.taskflow.danspelt.com/",
      description: "A project management tool designed to streamline your workflow."
    },
    {
      name: "EcoCart Boutique",
      url: "https://www.ecocartboutique.danspelt.com/",
      description: "An eco-friendly shopping platform offering sustainable products."
    },
    {
      name: "PrimePulse",
      url: "https://www.primepulse.danspelt.com/",
      description: "A cutting-edge health monitoring solution for the modern age."
    }
  ];

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
              <li key={index} className="card gap-2">
                <h3>{skill.category}</h3>
                <p>{skill.skill}</p>
                {skill.years ? <p>{skill.years} Years</p> : ""} 
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
              {/* Projects Section */}
      <section>
        <h2>Projects</h2>
        <div>
          {projects.map((project, index) => (
            <div key={index} className="card gap-2">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <Link href={project.url} target="_blank" rel="noopener" className="text-blue-500"> 
              View Project
              </Link>
            </div>
          ))}
        </div>
      </section>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div class="flex w-full justify-around">
          <Link
            href="mailto:dan@danspelt"
            className="flex flex-col text-blue-500 items-center no-underline"
          >
            <AiOutlineMail size={20} className="mr-2" />
            dan@danspelt.com
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
