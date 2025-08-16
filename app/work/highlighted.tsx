import { motion } from "framer-motion";
import Image from "next/image";

export type Job = {
    companyLogoUrl: string;
    companyName: string;
    title: string;
    duration: string;
    description: string;
    location?: string;
};

type Props = {
    jobData: Job;
    handleClose: () => void;
};

const Highlighted = ({ jobData, handleClose }: Props) => {
    const { companyLogoUrl, companyName, title, duration, description, location } = jobData;

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
                type: "spring", 
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
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-16 h-16 relative mr-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                            <Image
                                src={companyLogoUrl}
                                alt={companyName}
                                className="object-contain"
                                width={64}
                                height={64}
                                priority
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                            <p className="text-lg text-gray-600">{companyName}</p>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-4">
                        {location && (
                            <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {location}
                            </div>
                        )}
                        
                        <div className="flex items-center text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {duration}
                        </div>
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
