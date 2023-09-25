"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../navbar";
import { motion } from "framer-motion";
import Highlighted from "./highlighted";

export type Project = {
  id: number;
  imageUrl: string;
  title: string;
  summary: string;
  shownLink: string;
  link: string;
  description: string;
};

type Props = {
  project: Project;
  handleClose: () => void;
};

const projects: Project[] = [
  {
    id: 997,
    imageUrl: "/images/personalized-plates-dashboard.png",
    title: "Personalized Plates",
    summary:
      "A full stack application that eases the use for those with dietary restrictions to order meals within dining halls for Universities. ",
    shownLink: "https://order-a-meal.vercel.app/",
    link: "https://order-a-meal.vercel.app/",
    description:
      "The goal of Personalized Plates is to create a personalized meal ordering system for university dining halls. This is a full stack application that uses React, Next.js, and Tailwind CSS for the front end, and Prisma w/ Postgresql for the backend. The application is currently in development, and is not yet ready for use.",
  },
  {
    id: 998,
    imageUrl: "/images/timer-visual.png",
    title: "Timer",
    summary:
      "This is an interactive timer, originally created for the Fairfax County Public Schools School Board. It is a simple, easy to use timer that has shortcut buttons that allow the user to quickly set the timer. It is also possible to click on the timer to set the time manually.",
    shownLink: "Johntfulkerson.com/timer",
    link: "./timer",
    description:
      "This is an interactive timer, originally created for the Fairfax County Public Schools School Board. It is a simple, easy to use timer that has shortcut buttons that allow the user to quickly set the timer. It is also possible to click on the timer to set the time manually.",
  },
  {
    id: 999,
    imageUrl: "/images/meal-request-visual.png",
    title: "Custom Meal Request",
    summary:
      "This is a custom meal request written in python and flask. Its purpose is to make the custom meal ordering process easier for those with dietary restrictions at the University of Delaware dining halls. The web interface is in development, working but not visually appealing.",
    shownLink: "https://github.com/JTFulkerson/CustomMealRequest",
    link: "https://github.com/JTFulkerson/CustomMealRequest",
    description:
      "This is a custom meal request written in python and flask. Its purpose is to make the custom meal ordering process easier for those with dietary restrictions at the University of Delaware dining halls. The web interface is in development, working but not visually appealing.",
  },
  {
    id: 1000,
    imageUrl: "/images/wordle-visual.png",
    title: "Wordle",
    summary:
      "I was inspired by the Wordle game to create my own command line version. This takes a text file of previous words and randomly shuffles though to help practice for the game.",
    shownLink: "https://github.com/JTFulkerson/Wordle",
    link: "https://github.com/JTFulkerson/Wordle",
    description:
      "I was inspired by the Wordle game to create my own command line version. This takes a text file of previous words and randomly shuffles though to help practice for the game.",
  },
];

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.6 } },
};

const Page = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-8">Projects</h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="block rounded-lg overflow-hidden shadow-md relative"
              variants={variants}
            >
              <a href={project.link}>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64"
                  width={1624}
                  height={1056}
                  priority
                />
              </a>
              <div className="flex-grow p-6">
                <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                <p className="text-base text-gray-600 mb-20">
                  {project.summary}
                </p>
                <div className="flex justify-end">
                  <button
                    className="w-fit rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm absolute bottom-0 right-0 mb-6 mr-4"
                    onClick={() => handleProjectClick(project)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {selectedProject && (
          <Highlighted
            projectData={selectedProject}
            handleClose={handleProjectClose}
          />
        )}
      </div>
    </>
  );
};

export default Page;
