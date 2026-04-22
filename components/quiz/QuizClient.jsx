"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { getQuiz } from "@/lib/api/get-quiz";
import QuizHeader from "./QuizHeader";
import QuizProgress from "./QuizProgress";
import QuizNavigation from "./QuizNavigation";
import QuizQuestions from "./QuizQuestions";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import EmptyScreen from "./EmptyScreen";
import { useUser } from "@/hooks/get-user.hook";

const QuizClient = () => {
    const router = useRouter();
    const axiosInstance = axiosPrivateClient();
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const { userRefetch } = useUser();
    // Query for quiz questions
    const {
        data: quizQuestions = [],
        isLoading,
        isFetching,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ["quizQuestions"],
        queryFn: () => getQuiz(axiosInstance),
    });
    // Post answer mutation
    const postAnswer = useMutation({
        mutationKey: ["postAnswer"],
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/style-quiz/answers", {
                answers: data,
            });
            return response.data;
        },
        onSuccess: (response) => {
            console.log(response);
            toast.success(response?.message || "Answer submitted successfully");
            // Invalidate user data query to refresh user profile
            userRefetch();
            router.push("/profile-update");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to submit answer");
        },
    });
    // if postAnswer is in progress, show loading state
    if (postAnswer.isPending) {
        return (
            <LoadingScreen>
                <p className="text-lg font-semibold text-gray-700">Submitting answers...</p>
            </LoadingScreen>
        )
    }
    // Loading screen
    if (isLoading || isFetching) {
        return (
            <LoadingScreen>
                <p className="text-lg font-semibold text-gray-700">Loading quiz questions...</p>
            </LoadingScreen>
        );
    }
    // Error screen
    if (isError) {
        return (
            <ErrorScreen
                refetch={refetch}
                error={error}
                isLoading={isLoading}
                isFetching={isFetching}
            />
        );
    }
    // If there are no questions
    if (!quizQuestions || quizQuestions.length === 0) {
        return (
            <EmptyScreen refetch={refetch} />
        );
    }
    // Current question
    const question = quizQuestions[current];
    // Handle selecting an option (single choice)
    const handleSelectOption = (optionId) => {
        setAnswers((prev) => {
            const filtered = prev.filter((a) => a.question_id !== question.id);
            return [...filtered, { question_id: question.id, option_id: optionId }];
        });
    };
    // Check if option is selected
    const isSelected = (optionId) =>
        answers.some((a) => a.question_id === question.id && a.option_id === optionId);
    // Check if current question has been answered
    const hasAnswered = answers.some((a) => a.question_id === question.id);
    // Navigation functions
    // Function to go to the next question or submit answers
    const next = () => {
        if (!hasAnswered) {
            toast.error("Please select an option to continue.");
            return;
        }
        if (current < quizQuestions.length - 1) {
            setCurrent((prev) => prev + 1);
        } else {
            if (answers.length !== quizQuestions.length) {
                toast.error("Please answer all questions before submitting.");
                return;
            }
            postAnswer.mutate(answers);
        }
    };
    // Function to go to the previous question
    const previous = () => {
        if (current > 0) setCurrent((prev) => prev - 1);
    };
    // Main quiz render
    return (
        <div className="w-full flex flex-col xl:gap-6 lg:gap-5 md:gap-4 gap-2.5">
            <QuizHeader />
            <QuizProgress current={current} quizQuestions={quizQuestions} />
            <QuizQuestions
                question={question}
                isSelected={isSelected}
                handleSelectOption={handleSelectOption}
            />
            <QuizNavigation
                current={current}
                previous={previous}
                next={next}
                quizQuestions={quizQuestions}
                hasAnswered={hasAnswered}
                isSelected={isSelected}
            />
        </div>
    );
};

export default QuizClient;