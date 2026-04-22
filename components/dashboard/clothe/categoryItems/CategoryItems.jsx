"use client"
import ItemCard from "./ItemCard";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { getWardrobeItems } from "@/lib/api/get-wardrobe-items";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Empty, Result } from "antd";
import CommonBtn from "@/components/common/CommonBtn";
import CustomPagination from "@/components/common/CustomPagination";
import ItemCardSkeleton from "./ItemCardSkeleton";

const CategoryItems = ({ category_slug }) => {
    // axios
    const axiosInstance = axiosPrivateClient();
    // track current page
    const [currentPage, setCurrentPage] = useState(1);
    // get category items
    const {
        data,
        isError,
        isLoading,
        isFetching,
        refetch
    } = useQuery({
        queryKey: ["wardrobeItems", category_slug, currentPage],
        queryFn: () => getWardrobeItems(axiosInstance, {
            params: { page: currentPage }
        }, category_slug),
        keepPreviousData: true,
        retry: false
    })
    // wardrobe categories list 
    const items = data?.items || [];
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
        <>
            { /* Conditional Render */}
            {
                isLoading || isFetching ? (
                    <div className="w-full grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 xs:gap-5 gap-3">
                        {[...Array(paginate?.per_page || 4)].map((_, index) => (
                            <ItemCardSkeleton key={index} />
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
                ) : items?.length === 0 ? (
                    <div className="w-full min-h-[70vh] flex justify-center items-center">
                        <Empty description="No Items Found" />
                    </div>
                ) : (
                    <div className="w-full grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 xs:gap-5 gap-3">
                        {items?.map((item) => (
                            <ItemCard refetch={refetch} key={item.id} item={item} category_slug={category_slug} />
                        ))}
                    </div>
                )
            }
            {/* pagination */}
            {paginate?.last_page > 1 && !isError && (
                <CustomPagination
                    handlePageClick={handlePageClick}
                    currentPage={currentPage}
                    perPage={paginate?.per_page}
                    totalItem={paginate?.total || 0}
                />
            )}
        </>
    )
}

export default CategoryItems