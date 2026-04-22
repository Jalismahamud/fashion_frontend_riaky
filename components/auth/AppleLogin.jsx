"use client";
import Image from "next/image";
import apple from "@/public/images/icons/apple.png";

const AppleLogin = () => {
    // apple login mutation for send token
    
    // apple login
    return (
        <button className="w-full flex cursor-pointer border border-common-border rounded-[40px] bg-white py-3 px-4 sm:py-4 sm:px-5 text-primary-dark capitalize gap-3 sm:gap-5 justify-center items-center transition-all">
            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                <Image
                    src={apple}
                    alt='apple'
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 640px) 20px, 24px"
                />
            </div>
            <span className="text-base">Continue with Apple</span>
        </button>
    )
}

export default AppleLogin