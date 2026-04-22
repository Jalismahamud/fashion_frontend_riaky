"use client"
import { cn } from "@/lib/utils"
const AuthTitle = ({ className = "", title = "" }) => {
    return (
        <p className={cn("sm:text-3xl  3xs:text-2xl text-xl font-semibold text-center text-primary-dark", className)}>{title}</p>
    )
}

export default AuthTitle