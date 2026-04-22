"use client"
import { cn } from "@/lib/utils"
const AuthSubText = ({ className = "", text = "" }) => {
    return (
        <p className={cn("xs:text-xl text-lg text-gray-400", className)}>{text}</p>
    )
}

export default AuthSubText