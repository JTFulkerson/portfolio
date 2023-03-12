"use client";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../navbar";
import { motion } from "framer-motion";

const About = () => {
    const hobbies = [
        { name: "Mountain Biking", icon: "🚵" },
        { name: "Sailing", icon: "⛵️" },
        { name: "Scuba Diving", icon: "🤿" },
        { name: "Music", icon: "🎶" },
    ];

    const skills = [
        { name: "Java", icon: "☕️", proficiency: "Intermediate" },
        { name: "Python", icon: "🐍", proficiency: "Intermediate" },
        { name: "C", icon: "🅒", proficiency: "Beginner" },
        { name: "HTML", icon: "🌐", proficiency: "Intermediate" },
        { name: "CSS", icon: "💅", proficiency: "Intermediate" },
        { name: "Node.js", icon: "🟢", proficiency: "Beginner" },
        { name: "React", icon: "⚛️", proficiency: "Beginner" },
    ];

    const certifications = [
        { name: "PADI Rescue Diver", icon: "🏊‍♂️" },
        { name: "PADI Emergency First Responder", icon: "🩹" },
        { name: "IYT International Crew", icon: "⛵️" },
        { name: "Marine Communications (VHF-SRC)", icon: "📡" },
    ];

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.6 } },
        exit: { opacity: 0, transition: { duration: 0.6 } },
    };

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        className="p-4 shadow-lg rounded-lg"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key="introduction"
                    >
                        <h1 className="text-2xl font-bold mb-4">Introduction</h1>
                        <p className="text-lg text-gray-600">
                            Hi, I&apos;m John Fulkerson, a freshman studying Computer Science with a concentration in Systems and Networks at the University of Delaware. I&apos;m from McLean, Virginia, just minutes outside of Washington, D.C.
                        </p>
                    </motion.div>
                    <motion.div
                        className="p-4 shadow-lg rounded-lg"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key="hobbies"
                    >
                        <h1 className="text-2xl font-bold mb-4">Hobbies</h1>
                        <div className="grid grid-cols-2 gap-4">
                            {hobbies.map((hobby, index) => (
                                <div className="flex items-center" key={`hobby-${index}`}>
                                    <span className="text-2xl mr-2">
                                        {hobby.icon}
                                    </span>
                                    <span className="text-lg">{hobby.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        className="p-4 shadow-lg rounded-lg"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key="skills"
                    >
                        <h1 className="text-2xl font-bold mb-4">Skills</h1>
                        <div className="grid grid-cols-2 gap-4">
                            {skills.map((skill, index) => (
                                <div className="flex items-center" key={`skill-${index}`}>
                                    <span className="text-2xl mr-2">
                                        {skill.icon}
                                    </span>
                                    <span className="text-lg">{skill.name}</span>
                                    <span className="text-lg font-semibold ml-2">{skill.proficiency}</span>
                                </div>
                            ))}

                        </div>
                    </motion.div>
                    <motion.div
                        className="p-4 shadow-lg rounded-lg"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key="certifications"
                    >
                        <h1 className="text-2xl font-bold mb-4">Certifications</h1>
                        <div className="grid grid-cols-2 gap-4">
                            {certifications.map((certification, index) => (
                                <div className="flex items-center" key={`certification-${index}`}>
                                    <span className="text-2xl mr-2">
                                        {certification.icon}
                                    </span>
                                    <span className="text-lg">{certification.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default About;