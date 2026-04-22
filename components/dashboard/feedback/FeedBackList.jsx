"use client";

import CommonBtn from "@/components/common/CommonBtn";
import CustomPagination from "@/components/common/CustomPagination";
import Loader from "@/components/common/Loader";
import StarRating from "@/components/common/StarRating";
import { getReviews } from "@/lib/api/get-reviews";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { useQuery } from "@tanstack/react-query";
import { Empty, Result } from "antd";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";

const FeedBackList = () => {
  // axios
  const axiosInstance = axiosPrivateClient();
  // track current page
  const [currentPage, setCurrentPage] = useState(1);
  // get reviews
  const { data, isError, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["reviews", currentPage],
    queryFn: async () =>
      getReviews(axiosInstance, { params: { page: currentPage } }),
    keepPreviousData: true, // smooth pagination
  });
  // reviews
  const reviews = data?.reviews || [];
  // paginate
  const paginate = data?.paginate || {
    last_page: 1,
    total: 0,
    per_page: 10,
    current_page: 1,
  };

  // page click
  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // main render
  return (
    <div className="w-full flex min-h-96 flex-col gap-6 justify-start items-start">
      {/* title */}
      <h2 className="sm:text-3xl text-xl font-bold capitalize">
        Others Review
      </h2>
      {/* feedbacks */}
      <div className="w-full flex  flex-col gap-4 sm:gap-6">
        {isLoading ? (
          <div className="w-full flex-col gap-3 h-96 flex justify-center items-center">
            <Loader />
            <p>Others Feedback Loading...</p>
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
        ) : reviews.length === 0 ? (
          <div className="w-full h-64 flex justify-center items-center">
            <Empty description="No Feedback Available" />
          </div>
        ) : (
          reviews.map((item) => (
            <div
              key={item.id}
              className="w-full flex sm:gap-5 gap-3 justify-start items-start"
            >
              <div className="sm:size-14 flex justify-center items-center size-10 border rounded-full shrink-0 overflow-hidden">
                {item?.user_avatar ? (
                  <img
                    src={item?.user_avatar}
                    alt={item?.user_name || "N/A"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-2xl" />
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="flex 2xs:flex-row flex-col items-center gap-2 sm:gap-3 justify-start">
                  <p className="sm:text-xl xs:text-lg text-base font-semibold text-nowrap">
                    {item?.user_name || "N/A"}
                  </p>
                  <StarRating
                    className="sm:text-lg text-base"
                    rating={item?.rating || 0}
                  />
                </div>
                <p className="text-base sm:text-lg 2xs:text-start text-center">
                  {item?.review_text || "N/A"}
                </p>
                <p className="text-base hidden font-semibold text-end">
                  {item?.created_at || "N/A"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* pagination */}
      {paginate?.last_page > 1 && !isError && (
        <CustomPagination
          handlePageClick={handlePageClick}
          currentPage={currentPage}
          perPage={paginate?.per_page}
          totalItem={paginate?.total || 0}
        />
      )}
    </div>
  );
};

export default FeedBackList;
