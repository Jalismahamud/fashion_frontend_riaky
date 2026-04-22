// hooks/get-categories.hook.js
import { getCategories } from "@/lib/api/get-categories";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUser } from "./get-user.hook";
import { useState } from "react";

export const useSubscription = () => {
    const axiosInstance = axiosPrivateClient();
    const { userRefetch } = useUser();
    const [cancelModal, setCancelModal] = useState(false);
    // purchase subscription
    const purchaseSubscription = useMutation({
        mutationKey: ["purchase-subscription"],
        mutationFn: async (plan_id) => {
            const response = await axiosInstance.post("/subscription/purchase", {
                plan_id: plan_id
            })
            return response.data
        },
        onSuccess: (response) => {
            if (response?.data?.checkout_url) {
                window.location.href = response.data.checkout_url;
            }
            toast.success(response?.message || "Subscription created successfully");
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    })
    // update or switch subscription
    const updateSubscription = useMutation({
        mutationKey: ["update-subscription"],
        mutationFn: async (plan_id) => {
            const response = await axiosInstance.post("/subscription/update", {
                plan_id: plan_id
            })
            return response.data
        },
        onSuccess: (response) => {
            toast.success(response?.message || "Subscription updated successfully");
            userRefetch();
            console.log(response);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    })
    // cancel subscription
    const cancelSubscription = useMutation({
        mutationKey: ["cancel-subscription"],
        mutationFn: async () => {
            const response = await axiosInstance.post("/subscription/cancel")
            return response.data
        },
        onSuccess: (response) => {
            toast.success(response?.message || "Subscription cancelled successfully");
            setCancelModal(false);
            userRefetch();
            console.log(response);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    })


    // all return
    return {
        purchaseSubscription,
        updateSubscription,
        cancelSubscription,
        setCancelModal,
        cancelModal
    };
};