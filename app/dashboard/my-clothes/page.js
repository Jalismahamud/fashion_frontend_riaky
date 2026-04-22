import MyClothesClient from "@/components/dashboard/clothe/MyClothesClient";
import OutfitSuggestion from "@/components/dashboard/clothe/OutfitSuggestion";
import Wardrobe from "@/components/dashboard/clothe/Wardrobe";
import PageWrapper from "@/components/dashboard/PageWrapper";
import { getOutfitSuggestion } from "@/lib/api/get-outfit-suggestion";
import { getWardrobe } from "@/lib/api/get-wardrobe";
import { axiosPrivateServer } from "@/lib/axios.private.server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

// meta data
export const metadata = {
  title: "Chique | My Clothes",
  description:
    "Your Personal Style Assistant. Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique AI.",
};

const MyClothes = async () => {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.AUTH_TOKEN_NAME)?.value;
  const axiosInstance = await axiosPrivateServer();

  if (token) {
    // Prefetch wardrobe and outfit server-side with token in headers

    // ✅ Prefetch wardrobe
    await queryClient.prefetchQuery({
      queryKey: ["wardrobe", token],
      queryFn: () =>
        getWardrobe(axiosInstance, {
          params: { page: 1 }
        }),
    });
    // ✅ Prefetch outfit suggestion
    await queryClient.prefetchQuery({
      queryKey: ["OutfitSuggestion", token],
      queryFn: () =>
        getOutfitSuggestion(axiosInstance),
    });
    // ✅ Log prefetched data
    // const prefetchedWardrobeData = queryClient.getQueryData(["OutfitSuggestion", token]);
    // console.log("Prefetched wardrobe data:", prefetchedWardrobeData);
  }

  // main render
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageWrapper className={`gap-10`}>
        <MyClothesClient />
      </PageWrapper>
    </HydrationBoundary>
  );
};

export default MyClothes;
