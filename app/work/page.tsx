"use client"
import Image from "next/image";
import Navbar from "../navbar";
import { motion } from "framer-motion";

const Jobs = () => {
    const jobs = [
        {
            companyLogoUrl: "/images/ud-minimal-logo.jpg",
            companyName: "University of Delaware",
            jobTitle: "Lab Assistant",
            jobDuration: "March 2023 - Present",
            jobDescription:
                "As a Lab Assistant, I support the day to day operations of the MakerGym through engagement with users of various experience levels, management of machine queues, administration of tool inventory, stocking of materials and other duties associated with maintaining a fabrication space. I serve in both the Physical and Digital Fabrication areas. I also assist with the development of the space, designing and implementing new processes and procedures to improve the user experience.",
        },
        {
            companyLogoUrl: "/images/fcps-minimal-logo.png",
            companyName: "Fairfax County Public Schools",
            jobTitle: "Student Technician event Event Technician",
            jobDuration: "October 2019 - Present",
            jobDescription:
                "Worked as a technician managing spaces while groups rented out FCPS spaces.Was mainly in charge of designing and executing sounds and lights equipment however we I was also in charge of general tech support or equipment rental setups.",
        },
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
                <h1 className="text-xl font-bold mb-8">My Work Experience</h1>
                <motion.div
                    className="grid grid-cols-1 gap-8"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {jobs.map((job) => (
                        <motion.div
                            key={job.jobTitle}
                            className="bg-white rounded-lg shadow-md p-8 flex items-center space-x-8"
                            variants={variants}
                        >
                            <div className="flex-shrink-0">
                                <Image
                                    src={job.companyLogoUrl}
                                    alt={job.companyName}
                                    className="h-full w-full object-contain"
                                    width={150}
                                    height={150}
                                    priority
                                />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-bold mb-2">{job.jobTitle}</h2>
                                <p className="text-base text-gray-600 mb-4">{job.companyName}</p>
                                <p className="text-base text-gray-600 mb-4">{job.jobDuration}</p>
                                <p className="text-base text-gray-600">{job.jobDescription}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default Jobs;
