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
    id: 997,
    companyLogoUrl: "/images/ud-minimal-logo.jpg",
    location: "South Central Community",
    companyName: "University of Delaware, Newark, DE",
    title: "Resident Assistant",
    duration: "August 2023 - Present",
    description:
      "As a Resident Assistant, I have 20 residents who I am responsible for. I am responsible for creating a community within my floor and ensuring that my residents are safe and happy. I am also responsible for creating and implementing programs for my residents to attend. I am also responsible for enforcing the rules of the residence hall and ensuring that my residents are following them.",
  },
  {
    id: 998,
    companyLogoUrl: "/images/ud-minimal-logo.jpg",
    location: "Pearson Hall Makerspace",
    companyName: "University of Delaware, Newark, DE",
    title: "Lab Assistant",
    duration: "March 2023 - Present",
    description:
      "As a Lab Assistant, I support the day-to-day operations of the Pearson Hall Makerspace through engagement with users of various experience levels, management of machine queues, administration of tool inventory, stocking of materials and other duties associated with maintaining a fabrication space. I serve in both the Physical and Digital Fabrication areas. I also assist with the development of the space, designing and implementing new processes and procedures to improve the user experience.",
  },
  {
    id: 999,
    companyLogoUrl: "/images/fcps-minimal-logo.png",
    location: "",
    companyName: "Fairfax County Public Schools, McLean, VA",
    title: "Event Service Technician",
    duration: "August 2022 - Present",
    description:
      "As an experienced Event Service Technician, I specialize in providing reliable and efficient technological support for schools within the Fairfax County Public School system. I have extensive expertise in live audio, lighting, and streaming services, which enables me to ensure that all technical aspects of events run smoothly. Additionally, I am adept at supporting teacher and faculty trainings by providing seamless laptop and projection support. I am skilled at quickly identifying and resolving technical issues, which allows me to provide the best possible support. With my strong attention to detail and excellent communication skills, I ensure that all stakeholders are kept informed and satisfied with the services I provide. The most common events were superintendent community meetings, school board meetings, and faculty. These events were high stake events that required a high level of professionalism and attention to detail.",
  },
  {
    id: 1000,
    companyLogoUrl: "/images/fcps-minimal-logo.png",
    location: "McLean High School",
    companyName: "Fairfax County Public Schools, McLean, VA",
    title: "Student Technician",
    duration: "October 2019 - August 2022",
    description:
      "As a student technician in high school, I was responsible for providing live sound and lighting support for various events held within the school. Additionally, I managed the spaces used for events and acted as the main point of contact between the event coordinators and the school while the event was takign place. With my strong attention to detail and ability to work well under pressure, I ensured that all technical aspects of the events ran smoothly. Through my work as a student technician, I gained valuable experience in event management and technical support, which has prepared me for future opportunities in this field.",
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
