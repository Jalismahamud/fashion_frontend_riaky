"use client"
import { axiosPrivateClient } from '@/lib/axios.private.client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link'
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa6';
import { FiLoader } from 'react-icons/fi'; // spinner icon

const ItemCard = ({ item = {}, category_slug, refetch }) => {
    const {
        id,
        slug,
        item_name,
        image_path,
    } = item || {}
    // axios
    const axiosInstance = axiosPrivateClient();
    // delete item mutation
    const deleteItemMutation = useMutation({
        mutationKey: ["delete-item", id],
        mutationFn: async () => {
            const response = await axiosInstance.delete(`/item/delete/${slug}`);
            return response.data;
        },
        onSuccess: (response) => {
            toast.success(response?.message || "Item deleted successfully");
            refetch();
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Error deleting item");
        },
    })
    const handleDelete = () => {
        confirm({
            title: "Are you sure you want to delete this item?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteItemMutation.mutate();
            },
        });
    };

    // main render
    return (
        <div className="w-full flex flex-col relative gap-3">
            {/* Delete Button */}
            <button
                type="button"
                onClick={() => deleteItemMutation.mutate()}
                disabled={deleteItemMutation.isPending}
                className="absolute top-2 right-2 bg-black size-10 flex items-center justify-center bg-opacity-70 text-white rounded-full cursor-pointer p-1 hover:bg-opacity-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {deleteItemMutation.isPending ? (
                    <FiLoader className="animate-spin text-lg" />
                ) : (
                    <FaTrash className="text-lg" />
                )}
            </button>

            {/* Image */}
            <div className="w-full h-[300px] overflow-hidden border bg-gray-100 rounded-md p-2">
                <img
                    src={image_path}
                    alt={item_name || "N/A"}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info */}
            <Link
                href={`/dashboard/my-clothes/${category_slug}/${slug}`}
                className="2xs:text-base text-sm text-primary-dark font-primary font-medium bg-[#F8F8F8] p-3 rounded-lg cursor-pointer"
            >
                {item_name || "N/A"}
            </Link>
        </div>
    )
}

export default ItemCard
