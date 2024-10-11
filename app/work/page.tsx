"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../navbar";
import { motion } from "framer-motion";
import Highlighted from "./highlighted";

export type Job = {
  id: number;
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
    id: 992,
    companyLogoUrl: "/images/aq-logo.png",
    location: "Tortola, British Virgin Islands",
    companyName: "ActionQuest",
    title: "Dive Instructor",
    duration: "June 7, 2024 - July 29, 2024",
    description:
      "As a Dive Instructor at ActionQuest, I was responsible for teaching scuba diving to students aged 12-16. I was responsible for leading dives and ensuring the safety of all students. I will also be responsible for creating a positive and inclusive community within the program and ensuring that all students feel welcome and supported.",
  },
  {
    id: 993,
    companyLogoUrl: "/images/ud-minimal-logo.jpg",
    location: "University Courtyard Apartments",
    companyName: "University of Delaware, Newark, DE",
    title: "Resident Assistant",
    duration: "August 2024 - Present",
    description:
      "As a Resident Assistant, I have 60 residents who I am responsible for. I am responsible for creating a community within my floor and ensuring that my residents are safe and happy. I am also responsible for creating and implementing programs for my residents to attend. I am also responsible for enforcing the rules of the residence hall and ensuring that my residents are following them.",
  },
  {
    id: 994,
    companyLogoUrl: "/images/aq-logo.png",
    location: "Tortola, British Virgin Islands",
    companyName: "ActionQuest",
    title: "Dive Instructor",
    duration: "June 7, 2024 - July 29, 2024",
    description:
      "As a Dive Instructor at ActionQuest, I was responsible for teaching scuba diving to students aged 12-16. I was responsible for leading dives and ensuring the safety of all students. I will also be responsible for creating a positive and inclusive community within the program and ensuring that all students feel welcome and supported.",
  },
  {
    id: 995,
    companyLogoUrl: "/images/ud-minimal-logo.jpg",
    location: "University Courtyard Apartments",
    companyName: "University of Delaware, Newark, DE",
    title: "Resident Assistant",
    duration: "August 2024 - Present",
    description:
      "As a Resident Assistant, I have 60 residents who I am responsible for. I am responsible for creating a community within my floor and ensuring that my residents are safe and happy. I am also responsible for creating and implementing programs for my residents to attend. I am also responsible for enforcing the rules of the residence hall and ensuring that my residents are following them.",
  },
  {
    id: 996,
    companyLogoUrl: "/images/ud-minimal-logo.jpg",
    location: "Residence Life & Housing",
    companyName: "University of Delaware, Newark, DE",
    title: "Resident Assistant",
    duration: "August 2023 - May 2024",
    description:
      "I'm currently in my second year as a Resident Assistant, overseeing 60 residents in apartment-style housing. In my first year, I managed 20 residents in dorm-style housing, focusing on building community through events, ensuring safety, and enforcing residence hall policies.",
  },
  {
    id: 997,
    companyLogoUrl: "/images/ud-minimal-logo.jpg",
    location: "Pearson Hall Makerspace",
    companyName: "University of Delaware, Newark, DE",
    title: "Lab Assistant",
    duration: "March 2023 - Present",
    description:
      "Last year, as a Lab Assistant at the Pearson Hall Makerspace, I supported daily operations by engaging with users, managing machine queues, and maintaining the fabrication space in both Physical and Digital Fabrication areas. In my second year, I am focused on managing a senior design team and overseeing the development of a full-stack application to streamline and consolidate makerspace processes. Once complete, the app will be used daily by makerspace staff, students, and college deans to analyze space usage and financial assets through real-time custom queries that can be saved to personal user dashboards.",
  },
  {
    id: 998,
    companyLogoUrl: "/images/actionquest-logo.png",
    location: "British Virgin Islands",
    companyName: "ActionQuest, West End, Tortola",
    title: "Dive Instructor",
    duration: "Summer 2024",
    description:
      "As a Dive Instructor at ActionQuest, I was responsible for teaching scuba diving to students ages 12-16. I led dives and ensured the safety of all students both in water and out of water through physics, health, and diving lessons. I was also responsible for creating a positive and inclusive community within the program and ensuring all students feel welcome and supported."
  },
  {
    id: 999,
    companyLogoUrl: "/images/fcps-minimal-logo.png",
    location: "",
    companyName: "Fairfax County Public Schools, McLean, VA",
    title: "Event Service Technician",
    duration: "August 2022 - June 2024",
    description:
      "I provided technical support for high-stakes events such as superintendent and school board meetings. I specialize in live audio, lighting, streaming, and laptop support for training. With strong problem-solving skills and attention to detail, I ensure smooth event execution and clear communication with all required internal and external clients.",
  },
  {
    id: 1000,
    companyLogoUrl: "/images/fcps-minimal-logo.png",
    location: "McLean High School",
    companyName: "Fairfax County Public Schools, McLean, VA",
    title: "Student Technician",
    duration: "October 2019 - August 2022",
    description:
      "In high school, I was involved with the theater program and was hired by the county to oversee paid events in the auditorium. My responsibilities included managing technical aspects like lighting, sound, and projections, as well as serving as the primary point of contact for clients, ensuring smooth communication and satisfaction during events.",
  },
];

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.6 } },
};

const Page = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleJobClose = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-8">Work Experience</h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {jobs.map((job) => (
            <motion.div
              key={job.title}
              className="bg-white rounded-lg shadow-md p-8 relative flex flex-col"
              variants={variants}
            >
              <div className="sm:flex-shrink-0 sm:mb-0 mb-4">
                <Image
                  src={job.companyLogoUrl}
                  alt={job.companyName}
                  className="h-fit object-contain"
                  width={150}
                  height={150}
                  priority
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-bold mb-2">{job.title}</h2>
                {job.location && (
                  <p className="text-base text-gray-600 mb-2">{job.location}</p>
                )}
                <p className="text-base text-gray-600 mb-4">
                  {job.companyName}
                </p>
                <p className="text-base text-gray-600 mb-14">{job.duration}</p>
                <div className="flex justify-end">
                  <button
                    className="w-fit rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm absolute bottom-0 right-0 mb-6 mr-4"
                    onClick={() => handleJobClick(job)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {selectedJob && (
          <Highlighted jobData={selectedJob} handleClose={handleJobClose} />
        )}
      </div>
    </>
  );
};

export default Page;
