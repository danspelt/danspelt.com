import React from 'react';
import Profile from './Profile';
import WorkExperience from './WorkExperience';
import ProjectShowcase from './ProjectShowcase';
import SkillsTools from './SkillsTools';
import DiversityAccessibility from './DiversityAccessibility';

const MainComponent = () => {
  return (
    <div>
      <Profile />
      <WorkExperience />
      <ProjectShowcase />
      <SkillsTools />
      <DiversityAccessibility />
    </div>
  );
};

export default MainComponent;