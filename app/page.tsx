"use client"
import Head from "next/head";
import Image from "next/image";
import Navbar from "./navbar";
import { motion } from "framer-motion";

const Home = () => {
  const socials = [
    {
      imageUrl: "/icons/email.svg",
      title: "Email",
      link: "mailto:johnfulky@mac.com",
    },
    {
      imageUrl: "/icons/github.svg",
      title: "GitHub",
      link: "https://github.com/JTFulkerson",
    },
    {
      imageUrl: "/icons/linkedin.svg",
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/jtfulkerson/",
    },
    {
      imageUrl: "/icons/instagram.svg",
      title: "Instagram",
      link: "https://www.instagram.com/jt_fulkerson/",
    },
    {
      imageUrl: "/icons/twitter.svg",
      title: "Twitter",
      link: "https://twitter.com/JT_Fulkerson",
    },
    {
      imageUrl: "/icons/facebook.svg",
      title: "Facebook",
      link: "https://www.facebook.com/john.fulkerson.98837/",
    }
  ];

  return (
    <>
      <Head>
        <title>John Fulkerson | Portfolio</title>
        <meta name="description" content="John Fulkerson, a Computer Science student at the University of Delaware." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            className="h-full w-full"
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
              <motion.div
                className="grid grid-flow-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                {socials.map((social) => (
                  <a href={social.link} key={social.title}>
                    <motion.div
                      className="1vw p-1 hover:pt-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      whileHover={{ scale: 1.2, zIndex: 1 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <Image
                        className="h-full w-ful"
                        src={social.imageUrl}
                        alt=""
                        width={100}
                        height={24}
                        priority
                      />
                    </motion.div>
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;