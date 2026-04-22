"use client";
import Link from "next/link";
import { RiDownloadCloudFill } from "react-icons/ri";
import WardrobeItemCard from "./WardrobeItemCard";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { useQuery } from "@tanstack/react-query";
import { getWardrobe } from "@/lib/api/get-wardrobe";
import { useState } from "react";
import CustomPagination from "@/components/common/CustomPagination";
import CommonBtn from "@/components/common/CommonBtn";
import { Empty, Result } from "antd";
import WardrobeItemCardSkeleton from "./WardrobeCardSkeleton";

const Wardrobe = () => {
  const axiosInstance = axiosPrivateClient();
  // track current page
  const [currentPage, setCurrentPage] = useState(1);
  // get wardrobe
  const { data, isError, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["wardrobe", currentPage],
    queryFn: () =>
      getWardrobe(axiosInstance, {
        params: { page: currentPage },
      }),
    keepPreviousData: true, // smooth pagination
    retry: false,
  });
  // wardrobe categories list
  const categories = data?.categories || [];
  // paginate
  const paginate = data?.paginate || {
    last_page: 1,
    total: 0,
    per_page: 4,
    current_page: 1,
  };
  // page click
  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // main render
  return (
    <div className="w-full flex flex-col xs:gap-6 gap-4">
      {/* Header Section */}
      <div className="w-full flex gap-2 justify-between items-center">
        <p className="truncate whitespace-nowrap overflow-hidden text-lg sm:text-2xl font-medium font-primary text-primary-dark">
          Add Item to Your Wardrobe
        </p>
        <Link
          href="/dashboard/my-clothes/add-item"
          className=" flex justify-center self-end  w-fit gap-2 items-center  px-5 rounded-md border py-2.5 text-base text-primary-dark font-medium font-primary cursor-pointer"
        >
          <RiDownloadCloudFill className="text-xl" />
          Add
        </Link>
      </div>
      {/* Wardrobe Items Section */}
      {isLoading || isFetching ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(paginate?.per_page || 4)].map((_, index) => (
            <WardrobeItemCardSkeleton key={index} />
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
      ) : categories?.length === 0 ? (
        <div className="w-full h-64 flex justify-center items-center">
          <Empty description="No Items Added" />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <WardrobeItemCard key={category.id} category={category} />
          ))}
        </div>
      )}
      {/* pagination */}
      {paginate?.last_page > 1 && !isError && (
        <CustomPagination
          variant={"justify-end my-5"}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
          perPage={paginate?.per_page}
          totalItem={paginate?.total || 0}
        />
      )}
    </div>
  );
};

export default Wardrobe;
