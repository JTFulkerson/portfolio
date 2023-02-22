import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-8">About Me</h1>
        <div className="grid grid-flow-col gap-6"></div>
      </div>
    </div>
  );
};

export default About;
