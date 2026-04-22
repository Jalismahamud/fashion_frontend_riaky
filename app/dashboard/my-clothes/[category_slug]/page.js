import CategoryItemClient from "@/components/dashboard/clothe/categoryItems/CategoryItemClient";
import CategoryItems from "@/components/dashboard/clothe/categoryItems/CategoryItems";
import PageWrapper from "@/components/dashboard/PageWrapper";
import { getWardrobeItems } from "@/lib/api/get-wardrobe-items";
import { axiosPrivateServer } from "@/lib/axios.private.server";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

export const metadata = {
  title: "Chique | My Clothe Lists",
  description:
    "Your Personal Style Assistant. Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique Al.",
};

const ClotheList = async ({ params }) => {
  const { category_slug } = await params;
  // Prepare query client
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.AUTH_TOKEN_NAME)?.value;
  const axiosInstance = await axiosPrivateServer();
  let prefetchedData;
  // Prefetch wardrobe items if token
  if (token) {
    // ✅ Prefetch wardrobe items server-side
    await queryClient.prefetchQuery({
      queryKey: ["wardrobeItems", token, category_slug],
      queryFn: () =>
        getWardrobeItems(
          axiosInstance,
          { params: { page: 1 } },
          category_slug
        ),
    });

    prefetchedData = queryClient.getQueryData([
      "wardrobeItems",
      token,
      category_slug,
    ]);
  }
  // console.log("Prefetched wardrobe items data:", prefetchedData);
  // main render
  return (
    <PageWrapper>
      <p className="xs:text-2xl text-xl capitalize font-semibold font-primary text-primary-dark">
        {prefetchedData?.category?.name ||
          category_slug.replace(/-/g, " ")}
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryItemClient category_slug={category_slug} />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default ClotheList;
