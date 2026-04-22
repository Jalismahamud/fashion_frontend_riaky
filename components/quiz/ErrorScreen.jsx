"use client"
const ErrorScreen = ({ isLoading, error, refetch, isFetching }) => {
    return (
        <div className="w-full  sm:min-h-[80vh] flex flex-col items-center justify-center text-center gap-5 sm:gap-10 p-2 sm:p-6">
            <div className="bg-red-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Failed to load quiz</h2>
            <p className="text-gray-600 max-w-md">
                {error?.message || "We couldn't load the quiz questions. Please try again later."}
            </p>
            <button
                onClick={() => refetch()}
                className="mt-4 px-6 py-2 bg-primary text-white cursor-pointer rounded-md bg-primary-dark transition-colors"
            >
                {isLoading || isFetching ? "Retrying..." : "Retry"}
            </button>
        </div>
    )
}

export default ErrorScreen