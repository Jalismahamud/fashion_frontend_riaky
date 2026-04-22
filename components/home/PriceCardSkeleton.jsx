const PriceCardSkeleton = () => {
    return (
        <div className="w-full flex flex-col justify-between animate-pulse gap-6 border rounded-[20px] py-6 px-5 min-h-[500px]">
            {/* name */}
            <div className=" w-28 h-8 bg-gray-200 rounded-full" />
            {/* price */}
            <div className="w-24 h-6 bg-gray-200 rounded-full" />
            {/* features */}
            <ul className="space-y-4 ">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-3 w-full"
                    >
                        <span className="w-5 h-5 bg-gray-200 rounded-full" />
                        <span className="w-32 h-5 bg-gray-200 rounded" />
                    </li>
                ))}
            </ul>
            {/* CTA button */}
            <div className="mt-8 w-full h-12 bg-gray-200 rounded-full" />
        </div>
    )
}

export default PriceCardSkeleton
