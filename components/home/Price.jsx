"use client";
import { useState } from "react";
import CommonTitle from "../common/CommonTitle";
import { motion } from "framer-motion";
import layer_image from "@/public/images/bannerImages/layer_image4.png";
import Image from "next/image";
import PriceCard from "./PriceCard";
import axiosPublic from "@/lib/axios.public";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { Empty } from "antd";
import PriceCardSkeleton from "./PriceCardSkeleton";


const Price = () => {
  const [billingType, setBillingType] = useState("monthly");
  const handleToggle = (type) => {
    setBillingType(type);
  };
  // hooks
  const axiosInstance = axiosPublic();
  // get plans
  const {
    data: plans = [],
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/subscription/plans");
      return res?.data?.data || [];
    },
  })

  // main render 
  return (
    <div id="subscriptions" className="w-full relative">
      <div className="container flex flex-col xs:gap-10 gap-5 xl:py-20">
        {/* Right side layer Flower Image with Animation */}
        <motion.div
          initial={{
            x: 200,
            opacity: 0,
            rotateX: 90,
            transformOrigin: "bottom right",
          }}
          animate={{ x: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute right-0 bottom-20 w-[300px] md:w-[400px] lg:w-[230px]"
        >
          <Image
            src={layer_image}
            alt="Right Flower"
            className="object-contain w-full h-auto"
            priority
          />
        </motion.div>
        {/* Title + Toggle */}
        <div className="w-full flex flex-col md:gap-4 gap-2 text-center items-center">
          <CommonTitle
            text="Subscriptions"
            className="font-secondary"
          />
          <p className="text-lg text-primary-dark font-primary font-normal text-center">
            Pay and cancel at any time.
          </p>

          {/* Monthly/Yearly Toggle */}
          <div className="relative hidden items-center w-[243px] h-[50px] bg-white/5 rounded-full border">
            {/* Slider */}
            <div
              className={`absolute w-1/2 h-full bg-[#0D0E10] rounded-full transition-all duration-300 ease-in-out ${billingType === "yearly"
                ? "translate-x-[120px]"
                : "translate-x-0"
                }`}
            ></div>

            {/* Monthly Button */}
            <button
              onClick={() => handleToggle("monthly")}
              className={`z-10 w-1/2 h-full rounded-full text-center font-medium transition-all duration-300 cursor-pointer ${billingType === "monthly" ? "text-white" : "text-black"
                }`}
            >
              Monthly
            </button>

            {/* Yearly Button */}
            <button
              onClick={() => handleToggle("yearly")}
              className={`z-10 w-1/2 h-full rounded-full text-center font-medium transition-all duration-300 cursor-pointer ${billingType === "yearly" ? "text-white" : "text-black"
                }`}
            >
              Yearly
            </button>
          </div>
        </div>
        {/* Pricing Cards */}
        {
          isLoading || isFetching ? (
            <div className="w-full grid 2xl:grid-cols-4 sm:grid-cols-2 xl:grid-cols-3 grid-cols-1 sm:gap-6 gap-3">
              {[...Array(4)].map((_, index) => (
                <PriceCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center min-h-40 text-red-500">
              <p>Failed to load plans. Please try again later.</p>
            </div>
          ) : plans?.length === 0 ? (
            <div className="flex items-center justify-center min-h-40 text-gray-500">
              <Empty />
              <p>No plans available yet.</p>
            </div>
          ) : (
            <div className="w-full grid 2xl:grid-cols-4 sm:grid-cols-2 xl:grid-cols-3 grid-cols-1 sm:gap-6 gap-3">
              {plans?.map((item, index) => (
                <PriceCard billingType={billingType} index={index} key={item.id} item={item} />
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Price;
