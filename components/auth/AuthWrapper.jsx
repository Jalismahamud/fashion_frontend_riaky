import { cn } from "@/lib/utils"

const AuthWrapper = ({ className = "", children }) => {
    return (
        <div className={cn("sm:p-10 xs:p-6 p-4 shadow-auth w-full max-w-[640px] bg-white rounded-2xl", className)}>
            {children}
        </div>
    )
}

export default AuthWrapper