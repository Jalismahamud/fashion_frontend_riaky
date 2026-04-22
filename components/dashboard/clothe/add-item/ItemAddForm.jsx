"use client";
import CommonBtn from "@/components/common/CommonBtn";
import CommonInputWrapper from "@/components/common/CommonInputWrapper";
import { useCategories } from "@/hooks/get-categories.hook";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ItemAddForm = ({ aiAnalyze = {}, status = {}, setAiAnalyze, setStatus }) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            clouth_type: "",
            color: "",
            material: "",
            season: "",
            pattern: "",
            category_id: undefined,
            item_name: "",
            buying_info: "",
            site_link: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });
    // Categories
    const { formattedCategories } = useCategories();
    // Router
    const router = useRouter();

    // Prefetch target page for faster routing
    useEffect(() => {
        router.prefetch("/dashboard/my-clothes");
    }, [router]);

    // Reset form when AI analysis result changes
    useEffect(() => {
        if (aiAnalyze?.result) {
            reset({
                clouth_type: aiAnalyze.result.Clothing_Type || "",
                color: aiAnalyze.result.Color || "",
                material: aiAnalyze.result.Material || "",
                season: aiAnalyze.result.Season || "",
                pattern: aiAnalyze.result.Pattern || "",
                category_id: undefined,
                item_name: "",
                buying_info: "",
                site_link: "",
            });
        }
    }, [aiAnalyze.result, aiAnalyze?.image, reset]);

    const axiosInstance = axiosPrivateClient();

    // Post item mutation
    const postItem = useMutation({
        mutationKey: ["postItem"],
        mutationFn: async (formData) => {
            const response = await axiosInstance.post("/item/store", formData);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Item added successfully!");
            // Navigate first (fast UX)
            router.push("/dashboard/my-clothes");
            // Cleanup form + states after navigation
            setTimeout(() => {
                reset();
                setAiAnalyze({ image: null, result: null });
                setStatus({ error: null, rawResponse: null, isLoading: false });
            }, 300);
        },
        onError: (err) => {
            console.error("❌ Error saving item:", err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        },
    });

    // Handle form submit
    const onSubmit = (formValues) => {
        if (!aiAnalyze?.image) {
            toast.error("Please upload and analyze an image before saving.");
            return;
        }
        const finalData = {
            ...formValues,
            image_path: aiAnalyze?.result?.removed_image_url ? aiAnalyze?.result?.removed_image_url : null,
            // image: aiAnalyze.image,
        };
        // console.log(aiAnalyze);
        console.log(finalData);
        postItem.mutate(finalData);
    };
    // Form
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
            <p className="xs:text-2xl text-xl text-primary-dark font-special font-medium">
                AI Analysis Results
            </p>
            {/* First grid section */}
            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-3 2xl:gap-5">
                <CommonInputWrapper
                    register={register}
                    errors={errors}
                    type="text"
                    name="clouth_type"
                    placeholder="Clothing Type"
                    register_as="clouth_type"
                    label="Clothing Type"
                    validationRules={{ required: "This field is required" }}
                />
                <CommonInputWrapper
                    register={register}
                    errors={errors}
                    type="select"
                    control={control}
                    options={formattedCategories}
                    name="category_id"
                    innerWrapper="!p-0"
                    placeholder="Select Category"
                    register_as="category_id"
                    label="Category"
                    validationRules={{ required: "This field is required" }}
                />
                <CommonInputWrapper
                    register={register}
                    errors={errors}
                    type="text"
                    name="material"
                    placeholder="Material"
                    register_as="material"
                    label="Material"
                    validationRules={{ required: "This field is required" }}
                />
                <CommonInputWrapper
                    register={register}
                    errors={errors}
                    type="text"
                    name="pattern"
                    placeholder="Pattern"
                    register_as="pattern"
                    label="Pattern"
                    validationRules={{ required: "This field is required" }}
                />
                <CommonInputWrapper
                    register={register}
                    errors={errors}
                    type="text"
                    name="color"
                    placeholder="Color"
                    register_as="color"
                    label="Color"
                    validationRules={{ required: "This field is required" }}
                />
                <CommonInputWrapper
                    register={register}
                    errors={errors}
                    type="text"
                    name="season"
                    placeholder="Season"
                    register_as="season"
                    label="Season"
                    validationRules={{ required: "This field is required" }}
                />
            </div>
            {/* Item details */}
            <CommonInputWrapper
                register={register}
                errors={errors}
                type="text"
                name="item_name"
                placeholder="Item name"
                register_as="item_name"
                label="Item name"
                validationRules={{ required: "This field is required" }}
            />
            <CommonInputWrapper
                register={register}
                errors={errors}
                type="text"
                name="buying_info"
                placeholder="Enter store name or location"
                register_as="buying_info"
                label="Where did you buy this?"
                validationRules={{ required: "This field is required" }}
            />
            <CommonInputWrapper
                register={register}
                errors={errors}
                type="url"
                name="site_link"
                placeholder="Enter link here"
                register_as="site_link"
                label="Link to item (optional)"
                validationRules={{
                    pattern: {
                        value:
                            /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/g,
                        message: "Please enter a valid URL",
                    },
                }}
            />
            {/* Submit */}
            <CommonBtn
                disabled={
                    !aiAnalyze?.image ||
                    !aiAnalyze?.result ||
                    status?.error ||
                    status?.rawResponse ||
                    status?.isLoading ||
                    postItem.isPending ||
                    !aiAnalyze?.result?.removed_image_url
                }
                type="submit"
                isLoading={postItem.isPending}
                className="rounded-xl mt-3"
            >
                Save
            </CommonBtn>
        </form>
    );
};

export default ItemAddForm;
