import Highlighted from '@/components/WorkHighlighted';
import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const Route = createFileRoute('/work')({
    component: RouteComponent,
})

export type Job = {
    companyLogoUrl: string;
    location: string;
    companyName: string;
    title: string;
    duration: string;
    description: string;
};

type Props = {
    job: Job;
    handleClose: () => void;
};

const jobs: Job[] = [
    {
        companyLogoUrl: "/images/costar-logo.png",
        location: "Shared Services Team",
        companyName: "CoStar Group, Arlington, VA",
        title: "Technology Intern",
        duration: "June 2025 - August 2025",
        description:
            "Collaborated on CoStar’s first infrastructure-based generative AI framework to scale AI-powered content creation across all products. Built with TypeScript and AWS services, the system improved workflow speed, accuracy, and cost efficiency.",
    },
    {
        companyLogoUrl: "/images/ud-minimal-logo.jpg",
        location: "Residence Life & Housing",
        companyName: "University of Delaware, Newark, DE",
        title: "Resident Assistant",
        duration: "August 2023 - May 2025",
        description:
            "Served two years as a Resident Assistant, overseeing 60 residents in apartment-style housing during my second year and 20 residents in dorm-style housing during my first year. Focused on building community through events, ensuring safety, and enforcing residence hall policies.",
    },
    {
        companyLogoUrl: "/images/ud-minimal-logo.jpg",
        location: "Pearson Hall Makerspace",
        companyName: "University of Delaware, Newark, DE",
        title: "Lab Assistant",
        duration: "March 2023 - Present",
        description:
            "Last year, as a Lab Assistant at the Pearson Hall Makerspace, I supported daily operations by engaging with users, managing machine queues, and maintaining the fabrication space in both Physical and Digital Fabrication areas. In my second year, I am focused on managing a senior design team and overseeing the development of a full-stack application to streamline and consolidate makerspace processes. Once complete, the app will be used daily by makerspace staff, students, and college deans to analyze space usage and financial assets through real-time custom queries that can be saved to personal user dashboards.",
    },
    {
        companyLogoUrl: "/images/actionquest-logo.png",
        location: "British Virgin Islands",
        companyName: "ActionQuest, West End, Tortola",
        title: "Dive Instructor",
        duration: "Summer 2024",
        description:
            "As a Dive Instructor at ActionQuest, I was responsible for teaching scuba diving to students ages 12-16. I led dives and ensured the safety of all students both in water and out of water through physics, health, and diving lessons. I was also responsible for creating a positive and inclusive community within the program and ensuring all students feel welcome and supported."
    },
    {
        companyLogoUrl: "/images/fcps-minimal-logo.png",
        location: "Sprague Technology Center",
        companyName: "Fairfax County Public Schools, McLean, VA",
        title: "Event Service Technician",
        duration: "August 2022 - August 2025",
        description:
            "I provided technical support for high-stakes events such as superintendent and school board meetings. I specialize in live audio, lighting, streaming, and laptop support for training. With strong problem-solving skills and attention to detail, I ensure smooth event execution and clear communication with all required internal and external clients.",
    },
    {
        companyLogoUrl: "/images/fcps-minimal-logo.png",
        location: "McLean High School",
        companyName: "Fairfax County Public Schools, McLean, VA",
        title: "Student Technician",
        duration: "October 2019 - August 2022",
        description:
            "In high school, I was involved with the theater program and was hired by the county to oversee paid events in the auditorium. My responsibilities included managing technical aspects like lighting, sound, and projections, as well as serving as the primary point of contact for clients, ensuring smooth communication and satisfaction during events.",
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

function RouteComponent() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleJobClick = (job: Job) => {
        setSelectedJob(job);
    };

    const handleJobClose = () => {
        setSelectedJob(null);
    };

    return (
        <>
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
                    Work Experience
                </motion.h1>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {jobs.map((job, index) => (
                        <motion.div
                            key={`${job.title}-${job.companyName}-${index}`}
                            className="bg-white rounded-xl overflow-hidden shadow-lg relative group"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 relative mr-4 rounded-lg overflow-hidden flex items-center justify-center">
                                        <img
                                            src={job.companyLogoUrl}
                                            alt={job.companyName}
                                            className="object-contain"
                                            width={64}
                                            height={64}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                                        <p className="text-base text-gray-600">{job.companyName}</p>
                                    </div>
                                </div>

                                {job.location && (
                                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {job.location}
                                    </p>
                                )}

                                <p className="text-sm text-gray-500 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {job.duration}
                                </p>

                                <p className="text-base text-gray-600 mb-6 line-clamp-3">
                                    {job.description}
                                </p>

                                <div className="mt-auto flex justify-end">
                                    <motion.button
                                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium shadow-md hover:shadow-lg transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleJobClick(job)}
                                    >
                                        View Details
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <AnimatePresence>
                    {selectedJob && (
                        <Highlighted
                            jobData={selectedJob}
                            handleClose={handleJobClose}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
