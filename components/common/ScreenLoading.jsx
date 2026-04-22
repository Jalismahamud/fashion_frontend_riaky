import Loader from "./Loader";

const ScreenLoading = () => {
    return (
        <div
            aria-hidden="true" // prevent Next.js scroll/focus warnings
            className="w-full h-screen fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex justify-center items-center"
        >
            <Loader />
        </div>
    );
};

export default ScreenLoading;
