"use client"

import CommonBtn from "@/components/common/CommonBtn"
import CommonInputWrapper from "@/components/common/CommonInputWrapper"
import { axiosPrivateClient } from "@/lib/axios.private.client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Rate } from "antd"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const FeedBackForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const axiosInstance = axiosPrivateClient();
    const queryClient = useQueryClient();
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [rating, setRating] = useState(5);
    // mutation 
    const postFeedBack = useMutation({
        mutationKey: ["postFeedBack"],
        mutationFn: async (review) => {
            const response = await axiosInstance.post("/review/store", review);
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["reviews"],
                exact: true
            });
            reset()
            setRating(5)
            toast.success(data?.message || "Review submitted successfully");
        },
        onError: (err) => {
            console.log(err)
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    })
    // on submit
    const onSubmit = (data) => {
        postFeedBack.mutate({
            ...data,
            rating
        })
    }
    // form
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto flex flex-col gap-3 sm:gap-6 justify-start items-center">
            <h1 className="sm:text-3xl text-2xl font-bold capitalize">Give Review</h1>
            <div className="w-full flex justify-between items-center gap-3">
                <p className="font-medium capitalize text-xl">Select Rating</p>
                <Rate tooltips={desc} onChange={(value) => setRating(value)} defaultValue={rating} value={rating} />
            </div>
            <CommonInputWrapper
                register={register}
                errors={errors}
                type="textarea"
                name="review_text"
                placeholder="Type your review here..."
                register_as="review_text"
                validationRules={{
                    required: "This field is required",
                }}
            />
            {/* submit button */}
            <CommonBtn type="submit" isLoading={postFeedBack.isPending} disabled={postFeedBack.isPending}>
                Submit
            </CommonBtn>
        </form>
    )
}

export default FeedBackForm