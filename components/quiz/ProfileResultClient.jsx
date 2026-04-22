"use client"
import { useUser } from "@/hooks/get-user.hook"
import { FaCheck } from "react-icons/fa6"

const ProfileResultClient = () => {
    const { userData } = useUser()
    const style_profile = userData?.style_profile || {}
    // handle keywords
    const keywords = style_profile?.keywords
        ? style_profile.keywords.includes(",")
            ? style_profile.keywords.split(",").map((kw) => kw.trim())
            : style_profile.keywords
        : null

    return (
        <div className="border rounded-lg sm:p-4 py-2 px-3 font-primary flex flex-col justify-start items-start sm:gap-3 gap-2 border-gray-300 max-w-[550px] w-full">
            {/** style profile type */}
            <p className="text-primary-dark sm:text-xl text-base xs:text-lg font-bold font-secondary capitalize">
                {style_profile?.type || "Unknown"}
            </p>
            {/** style profile details */}
            <p className="text-primary-dark text-sm sm:text-base ">
                {style_profile?.details || "Unknown"}
            </p>
            {/** style profile quiz answers */}
            <div className="w-full flex flex-col gap-2 justify-start items-start">
                {
                    style_profile?.quiz_set?.length > 0 && (
                        style_profile?.quiz_set?.map((quiz, idx) => (
                            <div key={idx} className="w-full flex gap-2 justify-start items-start">
                                <FaCheck className="shrink-0 mt-1 text-primary-dark" />
                                <p className="">{quiz?.answer || "N/A"}</p>
                            </div>
                        ))
                    )
                }
            </div>
            {/** style profile keywords */}
            <div className="text-primary-dark text-base w-full flex flex-col gap-2">
                <p className="sm:text-xl text-base font-medium">Keywords:</p>
                {Array.isArray(keywords) ? (
                    <div className="flex flex-wrap w-full gap-2 ">
                        {keywords.map((word, idx) => (
                            <span className="rounded-3xl text-xs capitalize bg-[#F5F6F7] px-2 py-1" key={idx}># {word}</span>
                        ))}
                    </div>
                ) : (
                    <span>{keywords || "Unknown"}</span>
                )}
            </div>
        </div>
    )
}

export default ProfileResultClient
