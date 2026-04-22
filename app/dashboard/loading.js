import Loader from "@/components/common/Loader";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className="w-full flex absolute inset-0 bg-white/80 backdrop-blur-2xl justify-center items-center h-full ">
            <Loader />
        </div>
    )
}