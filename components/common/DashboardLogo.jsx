"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import image from "@/public/images/logo/logo.png";

const DashboardLogo = ({ className = "" }) => {
  return (
    <Link
      className={cn(
        "w-fit h-14 flex justify-start items-center overflow-hidden",
        className
      )}
      prefetch={true}
      href={"/"}
    >
      <div className="w-40 h-10 -ml-14 overflow-hidden">
        <img
          src={image.src}
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};

export default DashboardLogo;
