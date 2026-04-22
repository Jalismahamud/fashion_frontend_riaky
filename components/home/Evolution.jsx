"use client";
import CommonBtn from "../common/CommonBtn";
import CommonSectionTitle from "../common/CommonSectionTitle";
import { motion } from "framer-motion";
import layer_image from "@/public/images/bannerImages/layer_image5.png";
import Image from "next/image";
import Link from "next/link";

const Evolution = () => {
  return (
    <div className="w-full relative">
      <div className="max-w-4xl mx-auto flex flex-col justify-center items-center sm:gap-8 3xs:gap-5 gap-3 md:py-20 xs:py-16 2xs:py-10 2xs:pb-0 pb-5">
        {/* left side layer Flower Image with Animation */}
        <motion.div
          initial={{
            x: -200,
            opacity: 0,
            rotateX: 90,
            transformOrigin: "bottom left",
          }}
          animate={{ x: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute left-0 bottom-0 w-[250px]"
        >
          <Image
            src={layer_image}
            alt="Right Flower"
            className="object-contain w-full h-auto"
            priority
          />
        </motion.div>
        <CommonSectionTitle
          text="Begin Your Style Evolution"
          className={"!font-bold !font-secondary"}
        />
        <p className="sm:text-xl text-lg text-center font-medium font-primary text-primary-dark px-4">
          Discover your aesthetic. Streamline your wardrobe. Dress with clarity.
        </p>
        <Link href="/dashboard">
          <CommonBtn className="rounded-lg text-nowrap w-fit !min-h-10 !p-2.5 !px-4">
            Try Chique Al
          </CommonBtn>
        </Link>
      </div>
    </div>
  );
};
export default Evolution;
