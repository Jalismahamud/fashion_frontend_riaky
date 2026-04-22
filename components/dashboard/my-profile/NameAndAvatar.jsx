import Loader from "@/components/common/Loader";
import { useUser } from "@/hooks/get-user.hook";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa6";

const NameAndAvatar = () => {
    const { userData, userRefetch } = useUser();
    // destructure user data
    const { user } = userData || {};
    // hooks
    const axiosInstance = axiosPrivateClient();
    // change avatar mutation 
    const changeAvatar = useMutation({
        mutationKey: ["change-avatar"],
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append("avatar", file);
            const response = await axiosInstance.post("/update-avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        },
        onSuccess: (response) => {
            toast.success(response?.message || "Avatar updated successfully");
            userRefetch();
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Something went wrong");
        },
    })
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            changeAvatar.mutate(file);
        }
    };
    // render
    return (
        <div className="w-full flex flex-col">
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">
                Profile Information
            </h2>
            <div className="space-y-2 text-sm flex flex-col items-center sm:text-base">
                <label htmlFor="avatar" className="size-36 border cursor-pointer relative  border-gray-400 bg-gray-200 flex items-center justify-center p-2 rounded-full">
                    {
                        user?.avatar ? (
                            <img
                                src={user?.avatar}
                                alt={user?.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <span className="text-2xl font-semibold">
                                {user?.name?.charAt(0)}
                            </span>
                        )
                    }
                    {/* loading state */}
                    {
                        changeAvatar.isPending && (
                            <div className="absolute rounded-full z-20 top-0 left-0 w-full h-full bg-gray-500/50 bg-opacity-50 flex items-center justify-center">
                                <Loader />
                            </div>
                        )
                    }
                    <span className="absolute size-8  rounded-full bottom-3 -right-1  bg-gray-500/50 bg-opacity-50 flex items-center justify-center">
                        <FaCamera />
                    </span>
                    {/* Avatar Input */}
                    <input type="file" name="avatar" id="avatar" hidden accept="image/*" onChange={(e) => handleAvatarChange(e)} />
                </label>
                <p>
                    <span className="font-semibold">Name:</span> {user?.name}
                </p>
                <p>
                    <span className="font-semibold">Email:</span> {user?.email}
                </p>
            </div>
        </div>
    )
}

export default NameAndAvatar