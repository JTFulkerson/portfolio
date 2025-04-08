"use client";
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
        { name: "C", icon: "🅒", proficiency: "Intermediate" },
        { name: "HTML", icon: "🌐", proficiency: "Intermediate" },
        { name: "CSS", icon: "💅", proficiency: "Intermediate" },
        { name: "Node.js", icon: "🟢", proficiency: "Intermediate" },
        { name: "React", icon: "⚛️", proficiency: "Intermediate" },
    ];

    const certifications = [
        { name: "Open Water Scuba Instructor", icon: "🌊" },
        { name: "Emergency First Responder Primary and Secondary Care Instructor", icon: "🚑" },
        { name: "Care for Children w/ AED Instructor", icon: "👶" },
        { name: "Dive Against Debris Instructor", icon: "♻️" },
        { name: "AWARE Coral Reef Conservation Specialty Instructor", icon: "🐠" },
        { name: "PADI AWARE Instructor", icon: "🌍" },
        { name: "Peak Performance Buoyancy Instructor", icon: "🏊" },
        { name: "Emergency Oxygen Provider", icon: "💨" },
        { name: "Rescue Diver", icon: "🛟" },
        { name: "Drift Diver", icon: "🌊" },
        { name: "Enriched Air Diver", icon: "🧪" },
        { name: "Search & Recovery Diver", icon: "🔍" },
        { name: "Fish Identification", icon: "🐟" },
        { name: "PADI Rescue Diver", icon: "🏊‍♂️" },
        { name: "PADI Emergency First Responder", icon: "🩹" },
        { name: "IYT International Crew", icon: "⛵️" },
        { name: "Marine Communications (VHF-SRC)", icon: "📡" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            transition: {
                duration: 0.2
            }
        }
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <motion.div
                            className="p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Introduction</h1>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                I&apos;m a Computer Science student at the University of Delaware, concentrating in Systems and Networks with a cumulative GPA of 3.83. I have experience as a Resident Assistant, Lab Assistant, and Scuba Diving Instructor, and I&apos;ve taken on leadership roles for the University&apos;s Sailing Team.
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white rounded-xl shadow-lg"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Hobbies</h1>
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                variants={containerVariants}
                            >
                                {hobbies.map((hobby, index) => (
                                    <motion.div
                                        className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        key={`hobby-${index}`}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className="text-3xl mr-4">{hobby.icon}</span>
                                        <span className="text-lg font-medium text-gray-800">{hobby.name}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white rounded-xl shadow-lg"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">Skills</h1>
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                variants={containerVariants}
                            >
                                {skills.map((skill, index) => (
                                    <motion.div
                                        className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        key={`skill-${index}`}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className="text-3xl mr-4">{skill.icon}</span>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-medium text-gray-800">{skill.name}</span>
                                            <span className="text-sm text-gray-600">{skill.proficiency}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="p-8 bg-white rounded-xl shadow-lg"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Certifications</h1>
                        <motion.div 
                            className="grid grid-cols-1 gap-4"
                            variants={containerVariants}
                        >
                            {certifications.map((certification, index) => (
                                <motion.div
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                    key={`certification-${index}`}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <span className="text-3xl mr-4">{certification.icon}</span>
                                    <span className="text-lg font-medium text-gray-800">{certification.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default About;