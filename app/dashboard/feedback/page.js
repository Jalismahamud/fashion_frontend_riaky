import FeedBackForm from "@/components/dashboard/feedback/FeedBackForm"
import FeedBackList from "@/components/dashboard/feedback/FeedBackList"
import { getReviews } from "@/lib/api/get-reviews";
import { axiosPrivateServer } from "@/lib/axios.private.server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export const metadata = {
    title: 'Chique | Feed Back',
    description: 'Your Personal Style Assistant.Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique Al.',
}

const FeedBack = async () => {
    // get user data
    const queryClient = new QueryClient();
    const cookieStore = await cookies();
    const token = cookieStore.get(process.env.AUTH_TOKEN_NAME)?.value;
    const axiosInstance = await axiosPrivateServer();
    // prefetch reviews if token
    if (token) {
        await queryClient.prefetchQuery({
            queryKey: ["reviews", 1, token],
            queryFn: () => getReviews(axiosInstance),
        });
    }
    // main render
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="w-full flex flex-col xs:gap-6 gap-4  py-5">
                {/* feed back form */}
                <FeedBackForm />
                {/* Previous feedback */}
                <FeedBackList />
            </div>
        </HydrationBoundary>
    )
}

export default FeedBack