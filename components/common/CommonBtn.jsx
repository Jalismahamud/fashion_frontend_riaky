"use client";
import Loader from "@/components/common/Loader";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CommonBtn = ({
  children,
  type = "submit",
  link = false,
  className,
  path = "",
  isLoading = false,
  onclick,
  disabled = false,
}) => {
  const commonStyle =
    "w-full cursor-pointer bg-primary-dark rounded-4xl px-4 sm:px-6 py-3 flex justify-center 2xs:min-h-[56px] items-center lg:text-xl !text-sm md:font-semibold font-medium text-white relative capitalize disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <>
      {link ? (
        <Link
          href={path}
          aria-hidden="true" // prevent scroll/focus warning
          className={cn(commonStyle, className)}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onclick}
          aria-hidden="true" // prevent scroll/focus warning
          className={cn(commonStyle, className)}
        >
          {isLoading ? <Loader /> : children}
        </button>
      )}
    </>
  );
};

export default CommonBtn;
