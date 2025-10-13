import { motion } from "framer-motion";

export type Project = {
    id: number;
    imageUrl: string;
    title: string;
    summary: string;
    shownLink: string;
    link: string;
    description: string;
};

type Props = {
    projectData: Project;
    handleClose: () => void;
};

const Highlighted = ({ projectData, handleClose }: Props) => {
    const { imageUrl, title, summary, shownLink, link, description } = projectData;

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 25,
                stiffness: 300,
                duration: 0.5
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            className="fixed z-50 inset-0 overflow-y-auto flex justify-center items-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                variants={overlayVariants}
                onClick={handleClose}
            />

            <motion.div
                className="relative bg-white rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
            >
                <div className="relative h-64 w-full">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="text-2xl font-bold">{title}</h3>
                        <a
                            href={link}
                            className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {shownLink}
                        </a>
                    </div>
                </div>

                <div className="p-6">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <motion.button
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium shadow-md hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleClose}
                        >
                            Close
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Highlighted;
