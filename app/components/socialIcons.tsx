import Image from "next/image";
import { motion } from "framer-motion";

interface SocialProps {
    className?: string;
}

const Social = ({ className = '' }: SocialProps) => {
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

    // Calculate optimal sizing based on container and number of icons
    const numIcons = socials.length;
    const gapMultiplier = numIcons - 1; // Number of gaps between icons

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
        <div className={`flex justify-center lg:justify-start items-center w-full ${className}`}>
            <motion.div
                className="flex items-center justify-between w-full max-w-sm sm:max-w-md lg:max-w-lg gap-4 sm:gap-6"
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
                        className="bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex-shrink-0 p-3 sm:p-4 md:p-4 lg:p-5"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.title}
                    >
                        <Image
                            className="block w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
                            src={social.imageUrl}
                            alt={social.title}
                            width={36}
                            height={36}
                            priority
                        />
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
}

export default Social;