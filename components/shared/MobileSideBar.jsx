"use client";
import { RxCross2 } from "react-icons/rx";
import Logo from "../common/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/get-user.hook";
import { FaUser } from "react-icons/fa6";
import LanguageSection from "./LanguageSection";

const MobileSideBar = ({ toggleSidebar, isOpen }) => {
  const { userData, isLoggedIn } = useUser();
  const pathname = usePathname();

  let navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Subscription", path: "/#subscriptions" },
    { name: "Contact", path: "/contact" },
  ];

  if (isLoggedIn) {
    navItems = [{ name: "Dashboard", path: "/dashboard" }, ...navItems];
  }
  // main render
  return (
    <div className={`fixed top-0 overflow-hidden left-0 h-screen w-full xs:w-2xs bg-background z-[1000] shadow-lg p-4 flex flex-col transform transition-transform duration-300  ${isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo & Close */}
      <div className="w-full shrink-0 flex justify-between items-center mb-6">
        <Logo />
        <button
          onClick={toggleSidebar}
          className="cursor-pointer"
          aria-label="Close menu"
        >
          <RxCross2 className="text-2xl" />
        </button>
      </div>

      {/* Language Selector */}
      <div className="w-full  mb-5 flex justify-end items-center">
        <LanguageSection className="w-full" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col w-full space-y-1 h-full">
        {navItems.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            onClick={toggleSidebar}
            className={`rounded w-full p-3 transition-colors duration-200 ${pathname === item.path
              ? "bg-primary-dark text-white"
              : "hover:bg-primary-dark hover:text-white"
              }`}
          >
            {item.name}
          </Link>
        ))}

        {/* Auth links (if not logged in) */}
        {!isLoggedIn && (
          <>
            <Link
              href="/auth/sign-up"
              onClick={toggleSidebar}
              className="rounded w-full p-3 hover:bg-primary-dark hover:text-white transition-colors duration-200"
            >
              Sign Up
            </Link>
            <Link
              href="/auth/sign-in"
              onClick={toggleSidebar}
              className="rounded w-full p-3 hover:bg-primary-dark hover:text-white transition-colors duration-200"
            >
              Log In
            </Link>
          </>
        )}
      
      </div>

      {/* User Profile (if logged in) */}
      {isLoggedIn && (
        <Link
          prefetch={true}
          href="/dashboard/my-profile"
          className="flex items-center gap-3 shrink-0 mt-auto"
        >
          <div className="size-12 shrink-0 border flex justify-center items-center border-gray-500 overflow-hidden rounded-full">
            {userData?.user?.avatar ? (
              <img
                src={userData?.user?.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="sm:text-xl text-sm" />
            )}
          </div>
          <span className="text-lg hidden 3xs:block line-clamp-1 font-medium text-gray-800">
            {userData?.user?.name || "Guest"}
          </span>
        </Link>
      )}
    </div>
  );
};

export default MobileSideBar;
