// hooks/get-categories.hook.js
import { getCategories } from "@/lib/api/get-categories";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    const axiosInstance = axiosPrivateClient();
    const {
        data: categories = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(axiosInstance),
        retry: false,
        refetchOnWindowFocus: false,
    });
    // format the categories
    const formattedCategories = categories.map((category) => ({
        value: category.id,
        label: category.name
    }))
    return { categories, formattedCategories, isLoading, isError }; // { data, isLoading, isError, error }
};
