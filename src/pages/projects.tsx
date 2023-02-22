import React from 'react';
import Navbar from '../components/Navbar';
import Timer from '../images/timer-visual.jpg';

const Projects: React.FC = () => {
  const projects = [
    {
      imageUrl: Timer,
      title: 'Timer',
      description:
        'This is an interactive timer, originally created for the Fairfax County Public Schools School Board. It is a simple, easy to use timer that has shortcut buttons that allow the user to quickly set the timer. It is also possible to click on the timer to set the time manually.',
      link: './timer',
    },
    {
      imageUrl: 'https://via.placeholder.com/500',
      title: 'Custom Meal Request',
      description:
        'This is a custom meal reuqeust command line application written in Python. Its purpose is to make the custom meal ordering process easier for those with dietary restrictions at the University of Delaware dini',
      link: 'https://github.com/JTFulkerson/CustomMealRequest',
    },
    {
      imageUrl: 'https://via.placeholder.com/500',
      title: 'Project 3',
      description:
        'Vestibulum vel metus finibus, auctor elit nec, sagittis purus. Proin hendrerit rhoncus diam quis lobortis.',
      link: 'https://www.example.com/project3',
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-8">My Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              href={project.link}
              key={project.title}
              className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg  hover:text-blue-500"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                <p className="text-base text-gray-600">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
