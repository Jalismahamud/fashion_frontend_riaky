"use client";
import Image from "next/image";
import { GoFileDirectory } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const WardrobeItemCard = ({ category = {} }) => {
  const {
    id,
    slug,
    name = "",
    items = [], // each item should have {id, image}
  } = category;
  // main card render
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Slider */}
      <div className="w-full 2xs:h-[350px] h-[250px] overflow-hidden border border-primary-dark rounded-lg">
        {items.length > 0 ? (
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            loop={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={false}
            parallax={true}
            slidesPerView={1}
            className="h-full w-full custom-swiper"
          >
            {items.map((item) => (
              <SwiperSlide
                className="w-full h-full p-3 rounded-2xl overflow-hidden"
                key={item.id}
              >
                <img
                  className="w-full h-full object-contain !rounded-2xl"
                  src={item.image_path}
                  alt={item.item_name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No images available
          </div>
        )}
      </div>
      {/* Info */}
      <Link
        href={`/dashboard/my-clothes/${slug}`}
        className="w-full flex  sm:gap-4 gap-2 bg-[#F8F8F8] p-4 rounded-lg"
      >
        <div className="size-12 flex items-center justify-center bg-[#EDEDED] rounded-lg sm:p-3 p-1.5">
          <GoFileDirectory className="sm:text-2xl text-xl" />
        </div>
        <div className=" w-full flex flex-col">
          <p className="text-lg text-primary-dark font-medium font-primary">
            {name || "N/A"}
          </p>
          <p className="text-base font-bold text-primary-dark font-primary">
            {items?.length || 0} Items
          </p>
        </div>
      </Link>
    </div>
  );
};

export default WardrobeItemCard;
