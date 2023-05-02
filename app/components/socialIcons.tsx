import Image from "next/image";
import { motion } from "framer-motion";
const Social = () => {
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
                            height={100}
                            priority
                        />
                    </motion.div>
                </a>
            ))}
        </motion.div>
    );
}

export default Social;