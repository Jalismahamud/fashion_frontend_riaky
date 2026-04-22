"use client";

import CommonSectionTitle from "../common/CommonSectionTitle";
import { motion } from "framer-motion";
import layer_image from "@/public/images/bannerImages/layer_image2.png";
import Image from "next/image";

const WhyCreated = () => {
  return (
    <div className="w-full relative ">
      <div className="max-w-4xl mx-auto flex flex-col xl:gap-8 gap-5 px-6 xl:py-20 md:py-12 py-5 ">
        {/* Left side layer Flower Image with Animation - Responsive */}
        <motion.div
          initial={{
            x: -200,
            opacity: 0,
            rotateX: 90,
            transformOrigin: "bottom left",
          }}
          animate={{ x: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute left-0 lg:-bottom-8 bottom-0 2xl:w-[400px] xl:w-[300px] xs:w-[250px] w-[200px]"
        >
          <Image
            src={layer_image}
            alt="Decorative floral element"
            className="object-contain w-full h-auto"
            priority
          />
        </motion.div>

        {/* Title - Responsive */}
        <div className="relative z-10">
          <CommonSectionTitle
            text="Why It was Created"
            className="!font-bold !font-secondary"
          />
        </div>

        {/* Description - Responsive */}
        <p className=" sm:text-lg text-base text-center font-light font-primary text-primary-dark">
          Despite full wardrobes and endless options, many still ask the same
          question: "What should I wear?" Chique AI was built to bring styling,
          clarity, and smart shopping into one elegant experience.
        </p>
      </div>
    </div>
  );
};

export default WhyCreated;