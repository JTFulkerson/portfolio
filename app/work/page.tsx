"use client"
import Image from "next/image";
import Navbar from "../navbar";
import { motion } from "framer-motion";

const Jobs = () => {
    const jobs = [
        {
            companyLogoUrl: "/images/ud-minimal-logo.jpg",
            companyName: "University of Delaware, Newark, DE",
            jobTitle: "Lab Assistant",
            jobDuration: "March 2023 - Present",
            jobDescription:
                "As a Lab Assistant, I support the day to day operations of the MakerGym through engagement with users of various experience levels, management of machine queues, administration of tool inventory, stocking of materials and other duties associated with maintaining a fabrication space. I serve in both the Physical and Digital Fabrication areas. I also assist with the development of the space, designing and implementing new processes and procedures to improve the user experience.",
        },
        {
            companyLogoUrl: "/images/fcps-minimal-logo.png",
            companyName: "Fairfax County Public Schools, McLean, VA",
            jobTitle: "Event Service Technician",
            jobDuration: "August 2022 - Present",
            jobDescription:
                "As an experienced Event Service Technician, I specialize in providing reliable and efficient technological support for schools within the Fairfax County Public School system. I have extensive expertise in live audio, lighting, and streaming services, which enables me to ensure that all technical aspects of events run smoothly. Additionally, I am adept at supporting teacher and faculty trainings by providing seamless laptop and projection support. I am skilled at quickly identifying and resolving technical issues, which allows me to provide the best possible support. With my strong attention to detail and excellent communication skills, I ensure that all stakeholders are kept informed and satisfied with the services I provide.",
        },
        {
            companyLogoUrl: "/images/fcps-minimal-logo.png",
            companyName: "Fairfax County Public Schools, McLean, VA",
            jobTitle: "Student Technician",
            jobDuration: "October 2019 - August 2022",
            jobDescription:
                "As a student technician in high school, I was responsible for providing live sound and lighting support for various events held within the school. Additionally, I managed the spaces used for events and acted as the main point of contact between the event coordinators and the school while the event was takign place. With my strong attention to detail and ability to work well under pressure, I ensured that all technical aspects of the events ran smoothly. Through my work as a student technician, I gained valuable experience in event management and technical support, which has prepared me for future opportunities in this field."
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
                            className="bg-white rounded-lg shadow-md p-8 flex flex-col sm:flex-row items-center space-x-8"
                            variants={variants}
                        >
                            <div className="sm:flex-shrink-0 sm:mb-0 mb-4">
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
