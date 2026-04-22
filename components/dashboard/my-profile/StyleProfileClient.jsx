"use client";

import Loader from "@/components/common/Loader";
import { useUser } from "@/hooks/get-user.hook";
import { Result } from "antd";
import ProfileStyle from "./ProfileStyle";
import ProfileQuiz from "./ProfileQuiz";

const StyleProfileClient = () => {
    const { userData, isLoading } = useUser();
    // Loading state
    if (isLoading) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center py-10 text-gray-500">
                <Loader />
                <span className="ml-2">Loading profile information...</span>
            </div>
        );
    }
    // No user data state
    if (!userData) {
        return (
            <div className="w-full flex items-center justify-center py-10 text-gray-500">
                <Result
                    status="500"
                    title="Error getting profile information"
                    subTitle="No profile information available."
                />
            </div>
        );
    }
    return (
        <div className="w-full flex flex-col gap-8 text-black">
            {/* Style Section */}
            <ProfileStyle />
            {/* Quiz Answers */}
            <ProfileQuiz />
        </div>
    )
}

export default StyleProfileClient