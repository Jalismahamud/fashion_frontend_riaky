"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CommonBtn from "../common/CommonBtn";
import CommonTitle from "../common/CommonTitle";
import right_image from "@/public/images/bannerImages/rightFlower.png";
import left_image from "@/public/images/bannerImages/leftFlower.png";
import Link from "next/link";
import { useUser } from "@/hooks/get-user.hook";

const Hero = () => {
  const { accessToken } = useUser();
  // Hero Section
  return (
    <div className="relative w-full xl:min-h-[750px]  lg:min-h-[600px] sm:min-h-[700px] 2xs:min-h-[650px] min-h-[500px]  bg-white">
      {/* Left Flower Image with Animation */}
      <motion.div
        initial={{
          x: -200,
          opacity: 0,
          rotateX: 90,
          transformOrigin: "bottom left",
        }}
        animate={{ x: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute left-0 lg:bottom-0 lg:top-0 md:-top-10 2xs:-top-20 -top-16 w-[200px] 2xs:w-[250px] lg:w-[350px] xl:w-[500px]"
      >
        <Image
          src={left_image}
          alt="Left Flower"
          aria-hidden="true"
          className="object-contain w-full h-auto"
          priority
        />
      </motion.div>
      {/* Right Flower Image with Animation */}
      <motion.div
        initial={{
          x: 200,
          opacity: 0,
          rotateX: 90,
          transformOrigin: "bottom right",
        }}
        animate={{ x: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute right-0 lg:bottom-0 md:bottom-5 sm:bottom-10 2xs:bottom-0 -bottom-7 xl:w-[500px] lg:w-[350px] 2xs:w-[250px] w-[180px]" // lg:top-[100px] xl:bottom-0 xs:h-[380px] h-[300px]
      >
        <Image
          src={right_image}
          alt="Right Flower"
          aria-hidden="true"
          className="object-contain w-full h-auto"
          priority
        />
      </motion.div>

      {/* Hero Content with Animation */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
        className="w-full relative px-4 z-10 max-w-xl mx-auto 2xs:pt-60 pt-48 flex flex-col md:gap-6 xs:gap-3 gap-1 justify-center items-start"
      >
        <CommonTitle
          text="Your Personal Style Assistant"
          className="!text-start font-secondary !font-semibold "
        />
        <p className="sm:text-xl xs:text-lg text-base font-primary text-primary-dark font-normal text-start xs:mt-0 mt-2">
          Discover your unique style, organize your wardrobe, and get
          personalized fashion advice with Chique Al.
        </p>
        {/* navigate to dashboard chat page */}
        {!accessToken && (
          <CommonBtn link={true} path="/auth/sign-in" className="rounded-lg text-nowrap w-fit !min-h-10 !p-2.5 !px-4">
            Try Chique Al
          </CommonBtn>
        )}
      </motion.div>
    </div>
  );
};

export default Hero;
