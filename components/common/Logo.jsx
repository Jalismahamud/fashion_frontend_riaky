"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import image from "@/public/images/logo/logo.png";
const Logo = ({ className = "" }) => {
  return (
    <Link
      className={cn(
        "w-fit h-14 flex justify-start items-center overflow-hidden",
        className
      )}
      href={"/"}
    >
      <div className="sm:w-48 w-36 sm:h-12 h-9 overflow-hidden">
        <img
          src={image.src}
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};

export default Logo;
