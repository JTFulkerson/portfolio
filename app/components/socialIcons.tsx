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
        <div 
            className={`${className}`}
            style={{
                // Algorithm: Distribute available width among icons and gaps
                // Total width = (icon + padding*2) * numIcons + gap * (numIcons-1)
                // Solve for icon size to fill container width
                '--base-gap': '0.5rem',
                '--container-padding': '0.25rem',
                '--available-width': `calc(100% - var(--container-padding) * 2)`,
                '--gap-total': `calc(var(--base-gap) * ${gapMultiplier})`,
                '--icon-container-width': `calc((var(--available-width) - var(--gap-total)) / ${numIcons})`,
                '--icon-padding': 'max(0.15rem, min(0.4rem, calc(var(--icon-container-width) * 0.08)))',
                '--icon-size': `calc(var(--icon-container-width) - var(--icon-padding) * 2)`,
                padding: 'var(--container-padding)',
                height: 'calc(var(--icon-container-width) + var(--container-padding) * 2)'
            } as React.CSSProperties}
        >
            <motion.div
                className="flex justify-between items-center w-full h-full"
                style={{
                    gap: 'var(--base-gap)'
                }}
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
                        className="bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex-shrink-0"
                        style={{
                            padding: 'var(--icon-padding)',
                            width: 'var(--icon-container-width)',
                            height: 'var(--icon-container-width)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            aspectRatio: '1',
                            minWidth: 'calc(30px + var(--icon-padding) * 2)',
                            minHeight: 'calc(30px + var(--icon-padding) * 2)',
                            maxWidth: 'calc(72px + var(--icon-padding) * 2)',
                            maxHeight: 'calc(72px + var(--icon-padding) * 2)'
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.title}
                    >
                        <Image
                            className="block"
                            style={{
                                width: 'var(--icon-size)',
                                height: 'var(--icon-size)',
                                maxWidth: '72px',
                                maxHeight: '72px',
                                minWidth: '50px',
                                minHeight: '50px'
                            }}
                            src={social.imageUrl}
                            alt={social.title}
                            width={50}
                            height={50}
                            priority
                        />
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
}

export default Social;