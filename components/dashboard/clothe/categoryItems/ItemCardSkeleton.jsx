"use client";
import { GoFileDirectory } from "react-icons/go";

const ItemCardSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-3 animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full  h-[300px] overflow-hidden border border-primary-dark rounded-lg ">
                <div className="w-full h-full bg-gray-200 rounded-md"></div>
            </div>
            {/* Info Placeholder */}
            <div className="w-full flex sm:flex-row flex-col sm:gap-4 gap-2 bg-[#F8F8F8] sm:p-4 p-2 rounded-lg">
                
            </div>
        </div>
    );
};

export default ItemCardSkeleton;
