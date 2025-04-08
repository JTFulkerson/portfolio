"use client"
import Head from "next/head";
import Image from "next/image";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import Social from "./components/socialIcons";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      <Head> </Head>
      <Navbar />
      <motion.div
        className="h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              variants={imageVariants}
              whileHover="hover"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              <Image
                src="/images/headshot.png"
                alt="John Fulkerson"
                height={1000}
                width={1000}
                priority
                className="w-full h-auto object-cover"
              />
            </motion.div>
            
            <motion.div
              className="flex flex-col justify-center space-y-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    John
                  </span>
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Fulkerson
                  </span>
                </h1>
              </motion.div>
              
              <motion.h2
                className="text-xl md:text-2xl text-gray-700 font-medium"
                variants={itemVariants}
              >
                BS Computer Science | University of Delaware '26
              </motion.h2>
              
              <motion.p
                className="text-lg text-gray-600 max-w-lg"
                variants={itemVariants}
              >
                Computer Science student with a passion for technology, diving, and sailing. 
                Experienced in full-stack development and always eager to learn new technologies.
              </motion.p>
              
              <motion.div
                className="pt-4"
                variants={itemVariants}
              >
                <Social />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;