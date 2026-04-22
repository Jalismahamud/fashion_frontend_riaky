import PageWrapper from "@/components/dashboard/PageWrapper";
import ClotheDetailsClient from "@/components/dashboard/clothe/clothe-details/ClotheDetailsClient";
import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { axiosPrivateServer } from "@/lib/axios.private.server";
import { getWardrobeItemDetails } from "@/lib/api/get-item-details";

export const metadata = {
  title: "Chique | My Clothe Details",
  description:
    "Your Personal Style Assistant.Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique Al.",
};
const AiStyle = async ({ params }) => {
  // params
  const { clothe_slug } = await params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.AUTH_TOKEN_NAME)?.value;
  const axiosInstance = await axiosPrivateServer();
  let prefetchedData;
  // Prefetch clothe server-side
  if (token) {
    await queryClient.prefetchQuery({
      queryKey: ["wardrobeItemDetails", token, clothe_slug],
      queryFn: () => getWardrobeItemDetails(axiosInstance, {}, clothe_slug),
    });
    prefetchedData = queryClient.getQueryData([
      "wardrobeItemDetails",
      token,
      clothe_slug,
    ]);
  }
  //console.log("Prefetched clothe data:", prefetchedData);
  // main render
  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClotheDetailsClient clothe_slug={clothe_slug} />
      </HydrationBoundary>
    </PageWrapper >
  );
};
export default AiStyle;
