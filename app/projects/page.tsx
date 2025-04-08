"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../navbar";
import { motion, AnimatePresence } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3
    }
  }
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
      <motion.div
        className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Projects
        </motion.h1>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="bg-white rounded-xl overflow-hidden shadow-lg relative group"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  width={1624}
                  height={1056}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <a 
                    href={project.link}
                    className="w-full p-4 text-white text-center font-medium"
                  >
                    Visit Project
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-gray-800">{project.title}</h2>
                <p className="text-base text-gray-600 mb-6">
                  {project.summary}
                </p>
                <div className="flex justify-between items-center">
                  <a 
                    href={project.link}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {project.shownLink}
                  </a>
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium shadow-md hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleProjectClick(project)}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <AnimatePresence>
          {selectedProject && (
            <Highlighted
              projectData={selectedProject}
              handleClose={handleProjectClose}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Page;
