"use client"
import { FaBars, FaUser } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/get-user.hook";
import Link from "next/link";
import LanguageSection from "./LanguageSection";
const NavBar = ({ setIsOpen }) => {
    const pathname = usePathname();
    const { userData } = useUser();
    const handleToggle = () => setIsOpen((prev) => !prev);
    // Map paths to page names
    const getPageTitle = () => {
        if (pathname === "/dashboard") return "Chat";
        if (pathname === "/dashboard/my-clothes") return "My Closet";
        if (pathname.startsWith("/dashboard/my-clothes/") && pathname.split("/").length === 4) {
            return "My Clothe Items";
        }
        if (pathname.startsWith("/dashboard/my-clothes/") && pathname.split("/").length === 5) {
            return "My Clothe Details";
        }
        if (pathname === "/dashboard/my-profile") return "My Profile";
        if (pathname === "/dashboard/my-profile/style-profile") return "My Style Profile";
        if (pathname === "/dashboard/my-profile/subscription") return "My Subscription";
        if (pathname === "/dashboard/explore") return "Explore";
        if (pathname === "/dashboard/feedback") return "Feedback";
        return "";
    };

    // nav component
    return (
        <nav className="w-full shrink-0 overflow-hidden px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center gap-4 h-20 border-b border-black/90">
            {/* Left Section */}
            <div className="flex w-full items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={handleToggle}
                    type="button"
                    className="cursor-pointer xl:hidden flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <FaBars className="text-2xl text-gray-700" />
                </button>

                {/* Page Title */}
                <h1 className="lg:text-2xl text-base font-bold capitalize text-gray-800 font-secondary tracking-wide line-clamp-1">
                    {getPageTitle()}
                </h1>
            </div>
            {/* Right Section - User Info */}
            <Link href={"/dashboard/my-profile"} className="flex shrink-0 items-center gap-3 px-3 py-2 hover:bg-gray-50 transition">
                <div className="sm:size-12 size-8 shrink-0 border overflow-hidden flex justify-center items-center border-gray-500 rounded-full ">
                    {
                        userData?.user?.avatar ? (
                            <img
                                src={userData?.user?.avatar}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FaUser className="sm:text-xl text-sm" />
                        )
                    }
                </div>
                <span className="text-lg hidden sm:block line-clamp-1 font-medium text-gray-800">
                    {userData?.user?.name || "Guest"}
                </span>
            </Link>
            <LanguageSection className={`!min-w-fit`} />
        </nav>
    );
};

export default NavBar;
