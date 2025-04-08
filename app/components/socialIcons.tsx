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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4
            }
        },
        hover: {
            y: -5,
            scale: 1.1,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.div
            className="flex flex-wrap gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {socials.map((social) => (
                <motion.a 
                    href={social.link} 
                    key={social.title}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                >
                    <Image
                        className="w-6 h-6"
                        src={social.imageUrl}
                        alt={social.title}
                        width={24}
                        height={24}
                        priority
                    />
                </motion.a>
            ))}
        </motion.div>
    );
}

export default Social;