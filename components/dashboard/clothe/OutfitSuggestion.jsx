"use client";
import Image from "next/image";
import {
  MdOutlineWbSunny,
  MdOutlineCloud,
  MdOutlineGrain,
  MdOutlineAcUnit,
  MdOutlineWaterDrop,
} from "react-icons/md";
import { WiDayThunderstorm } from "react-icons/wi";
import OutfitCard from "./OutfitCard";
import { useQuery } from "@tanstack/react-query";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { getOutfitSuggestion } from "@/lib/api/get-outfit-suggestion";
import { Result, Empty } from "antd";
import OutfitCardSkeleton from "./OutfitCardSkeleton";
import CommonBtn from "@/components/common/CommonBtn";

// helper fn: get weather icon
const getWeatherIcon = (main) => {
  if (!main) return <MdOutlineWbSunny className="text-2xl text-yellow-500" />;
  switch (main.toLowerCase()) {
    case "clear":
      return <MdOutlineWbSunny className="text-2xl text-yellow-500" />;
    case "clouds":
      return <MdOutlineCloud className="text-2xl text-gray-500" />;
    case "haze":
    case "fog":
    case "mist":
      return <MdOutlineGrain className="text-2xl text-gray-400" />;
    case "rain":
    case "drizzle":
      return <MdOutlineWaterDrop className="text-2xl text-blue-500" />;
    case "snow":
      return <MdOutlineAcUnit className="text-2xl text-blue-300" />;
    case "thunderstorm":
      return <WiDayThunderstorm className="text-2xl text-purple-500" />;
    default:
      return <MdOutlineWbSunny className="text-2xl text-yellow-500" />;
  }
};

const OutfitSuggestion = () => {
  // hooks
  const axiosInstance = axiosPrivateClient();
  // get outfit suggestions
  const { data, isError, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["OutfitSuggestion"],
    queryFn: () => getOutfitSuggestion(axiosInstance),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    // 👇 Cache settings
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (data considered fresh)
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours (kept in cache)
  });

  const suggestions = data?.suggestions || [];
  const weather = data?.weather || {};

  // main render
  return (
    <div className="w-full flex flex-col gap-6 justify-start">
      {/* Header Section weather info */}
      <div className="w-full flex items-center justify-between">
        <p className="xs:text-2xl text-xl text-primary-dark font-medium font-primary line-clamp-1">
          AI Outfit Suggestions
        </p>
        <div className="w-fit flex items-center  gap-3 text-primary-dark">
          {getWeatherIcon(weather?.description || weather?.main)}
          <div className="flex items-center gap-1">
            <p className="text-primary-dark text-base font-medium">
              {weather?.temperature || "N/A"} &deg;C
            </p>
            <p className="capitalize text-sm text-gray-600">
              {weather?.description || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {/* Outfit Suggestions Section */}
      {isLoading || isFetching ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(4)].map((_, index) => (
            <OutfitCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Result
            status={"error"}
            title={"Something went wrong!"}
            subTitle={"Please try again later."}
            extra={
              <CommonBtn
                onclick={() => refetch()}
                type="button"
                isLoading={isLoading || isFetching}
                className={"rounded-md"}
              >
                Try Again
              </CommonBtn>
            }
          />
        </div>
      ) : suggestions?.length === 0 ? (
        <div className="w-full h-64 flex justify-center items-center">
          <Empty description="No outfit suggestions found" />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {suggestions?.map((item) => (
            <OutfitCard item={item} key={item.item_id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OutfitSuggestion;
