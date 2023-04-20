"use client";
import Image from "next/image";
import Navbar from "../navbar";
import { motion } from "framer-motion";
import Head from "./head";

const Projects = () => {
  const projects = [
    {
      imageUrl: "/images/timer-visual.jpg",
      title: "Timer",
      description:
        "This is an interactive timer, originally created for the Fairfax County Public Schools School Board. It is a simple, easy to use timer that has shortcut buttons that allow the user to quickly set the timer. It is also possible to click on the timer to set the time manually.",
      link: "./timer",
    },
    {
      imageUrl: "/images/meal-request-visual.png",
      title: "Custom Meal Request",
      description:
        "This is a custom meal request command line application written in Python. Its purpose is to make the custom meal ordering process easier for those with dietary restrictions at the University of Delaware dining halls.",
      link: "https://github.com/JTFulkerson/CustomMealRequest",
    },
    {
      imageUrl: "/images/wordle-visual.png",
      title: "Wordle",
      description:
        "I was inspired by the Wordle game to create my own command line version. This takes a text file of previous words and randomly shuffles though to help practice for the game.",
      link: "https://github.com/JTFulkerson/Wordle",
    },
  ];

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Head></Head>
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-8">My Projects</h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {projects.map((project) => (
            <motion.a
              href={project.link}
              key={project.title}
              className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg  hover:text-blue-500"
              variants={variants}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-64 object-cover"
                width={1000}
                height={1000}
                priority
              />
              <div className="p-6">
                <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                <p className="text-base text-gray-600">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Projects;
