"use client";
import Link from "next/link";
import Logo from "../common/Logo";
import NavItems from "./NavItems";
import { IoMenu } from "react-icons/io5";
import { useUser } from "@/hooks/get-user.hook";
import { FaUser } from "react-icons/fa6";
import LanguageSection from "./LanguageSection";
const Header = ({ toggleSidebar }) => {
  const { userData, isLoggedIn } = useUser();

  // header component
  return (
    <header className="w-full sm:py-4 py-3 text-base font-secondary capitalize border-b font-medium backdrop-blur-md border-[#2E2125] sticky top-0 bg-background sticky-header z-[999]">
      <div className="container flex gap-6 justify-between overflow-hidden items-center">
        {/* Left: Logo + Mobile Menu */}
        <div className="lg:w-fit w-full flex items-center md:gap-2 justify-between">
          <Logo />
          <button
            onClick={toggleSidebar}
            className="cursor-pointer lg:hidden"
            aria-label="Toggle menu"
          >
            <IoMenu className="text-4xl text-[#0d0e10b4]" />
          </button>
        </div>
        {/* Middle: Nav */}
        <NavItems />
        {/* Right: Auth/User */}
        <div className="hidden lg:flex sm:gap-5 gap-3 justify-end items-center shrink-0">
          {isLoggedIn ? (
            <Link prefetch={true} href={"/dashboard/my-profile"} className="flex items-center gap-3 shrink-0">
              <div className="size-12 shrink-0 border flex justify-center items-center border-gray-500 overflow-hidden rounded-full">
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
              <span className="text-lg  hidden line-clamp-1 font-medium text-gray-800">
                {userData?.user?.name || "Guest"}
              </span>
            </Link>
          ) : (
            <Link
              href={"/auth/sign-in"}
              className="rounded-sm px-5 sm:py-2 py-1.5 font-semibold flex justify-center items-center border border-primary-dark hover:bg-primary-dark hover:text-white transition"
            >
              Log In
            </Link>
          )}
          <LanguageSection className={`!min-w-fit !min-h-[42px]`} />
        </div>
      </div>
    </header>
  );
};

export default Header;
