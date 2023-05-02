"use client"
import Head from "next/head";
import Image from "next/image";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import Social from "./components/socialIcons";

const Home = () => {
  return (
    <>
      <Head> </Head>
      <Navbar />
      <motion.div
        className="py-3 px-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ height: "h-full", overflow: "hidden" }}
      >
        <motion.div
          className="grid sm:grid-cols-2 w-fit h-fit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/headshot.png"
            alt=""
            height={1000}
            width={1000}
            priority
          />
          <motion.div
            className="flex justify-center items-center pl-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <motion.h1
                className="text-left text-[8vw] leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                John
              </motion.h1>
              <motion.h1
                className="text-left text-[8vw] leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Fulkerson
              </motion.h1>
              <motion.h2
                className="text-left text-[1.8vw] pb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                BS Computer Science | University of Delaware ’26
              </motion.h2>
              <Social />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;