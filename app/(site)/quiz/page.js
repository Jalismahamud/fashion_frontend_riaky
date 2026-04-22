import QuizClient from "@/components/quiz/QuizClient";
import { getQuiz } from "@/lib/api/get-quiz";
import { axiosPrivateServer } from "@/lib/axios.private.server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export const metadata = {
  title: "Chique | Discover Your Personal Style",
  description:
    "Take our style quiz and find your perfect fashion match. Answer 10 simple questions to find your perfect style match",
};

const Quiz = async () => {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.AUTH_TOKEN_NAME)?.value;
  const axiosInstance = await axiosPrivateServer();
  // get quiz
  if (token) {
    console.log("🚀 Prefetching quiz questions on server...");
    await queryClient.prefetchQuery({
      queryKey: ["quizQuestions"],
      queryFn: () => getQuiz(axiosInstance),
    });
    console.log("✅ Prefetch complete");
  } else {
    console.log("⚠️ No token found, skipping quiz prefetch");
  }
  // main render
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-6xl container flex flex-col sm:py-16 xs:py-12 py-10">
        <QuizClient />
      </div>
    </HydrationBoundary>
  );
};
export default Quiz;