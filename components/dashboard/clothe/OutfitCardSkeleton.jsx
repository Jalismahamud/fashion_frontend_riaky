"use client";

const OutfitCardSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-3 animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full  h-[220px] overflow-hidden border border-primary-dark rounded-lg ">
                <div className="w-full h-full bg-gray-200 rounded-md"></div>
            </div>
            {/* Info Placeholder */}
            <div className="w-full flex sm:flex-row flex-col sm:gap-4 gap-2 bg-[#F8F8F8] sm:p-4 p-2 rounded-lg">
                <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
        </div>
    );
};

export default OutfitCardSkeleton;
