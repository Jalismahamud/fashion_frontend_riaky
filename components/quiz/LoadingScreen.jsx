"use client"

import { cn } from "@/lib/utils"
import Loader from "../common/Loader"

const LoadingScreen = ({ className, children }) => {
    return (
        <div className={cn("w-full min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center text-center gap-5 sm:gap-10 p-2 sm:p-6", className)}>
            <Loader className={`size-10`} />
            {children}
        </div>
    )
}

export default LoadingScreen