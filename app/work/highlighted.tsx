import { useState } from "react";
import Image from "next/image";
import Navbar from "../navbar";
import { motion } from "framer-motion";

export type Job = {
    id: number;
    companyLogoUrl: string;
    companyName: string;
    title: string;
    duration: string;
    description: string;
};

type Props = {
    jobData: Job;
    handleClose: () => void;
};

const Highlighted = ({ jobData, handleClose }: Props) => {
    const { companyLogoUrl, companyName, title, duration, description } = jobData;

    return (
        <div className="fixed z-50 inset-0 overflow-y-auto flex justify-center items-center">
            <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>
            <div
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-3/4"
            >
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{companyName}</p>
                        <p className="text-sm text-gray-500">{duration}</p>
                        <div className="mt-4 text-base text-gray-700">{description}</div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Highlighted;
