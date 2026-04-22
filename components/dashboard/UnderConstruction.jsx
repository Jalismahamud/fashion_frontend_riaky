"use client";
import { FaTools, FaHammer, FaHardHat } from "react-icons/fa";
import { motion } from "framer-motion";

const UnderConstruction = ({ pageName = "this page" }) => {
    return (
        <div className="flex w-full flex-col items-center justify-center h-full text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex flex-col items-center"
            >
                <div className="relative">
                    <FaTools className="text-6xl text-yellow-500 mb-4" />
                    <FaHammer className="text-4xl text-amber-600 absolute -top-3 -right-3" />
                    <FaHardHat className="text-3xl text-amber-700 absolute -bottom-2 -left-3" />
                </div>
                <h2 className="text-3xl font-bold mt-4 text-gray-800">
                    Under Construction
                </h2>
            </motion.div>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-lg text-gray-600 max-w-md mb-8"
            >
                {`Our ${pageName} is currently being built. We're working hard to bring you an amazing experience soon!`}
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-amber-100 border-l-4 border-amber-500 p-4 max-w-md w-full"
            >
                <p className="text-amber-700">
                    <strong>Coming Soon:</strong> Check back later for updates!
                </p>
            </motion.div>
        </div>
    );
};

export default UnderConstruction;