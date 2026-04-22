"use client";
import { FaLock } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { GiGiftOfKnowledge } from "react-icons/gi";
import Link from "next/link";

const NotSubscribed = ({ children }) => {

    // main render
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
            {/* Icon */}
            <div div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4 shadow">
                <FaLock size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
                Feature Blocked
            </h2>
            {/* Description */}
            {children}
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
                <Link
                    href="/#subscriptions"
                    className="flex items-center justify-center gap-2 px-6 py-3 !bg-primary-dark !text-white font-medium rounded-md shadow hover:opacity-90 transition"
                >
                    <MdOutlineWorkspacePremium size={20} />
                    See Our Plans
                </Link>
                <Link
                    href={'/#subscriptions'}
                    className="flex items-center justify-center gap-2 px-6 py-3 !bg-gray-100 !text-gray-700 font-medium rounded-md shadow hover:bg-gray-200 transition"
                >
                    <GiGiftOfKnowledge size={20} />
                    Try Free Demo
                </Link>
            </div>
        </div >
    );
};

export default NotSubscribed;
