"use client";

import { GiShoppingBag } from "react-icons/gi";
import { useRouter } from "next/navigation";

const ShopButton = () => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center">
      <button
        className="w-fit flex gap-2 rounded-lg bg-primary-dark font-primary text-white px-6 py-3 sm:py-4 justify-center items-center cursor-pointer hover:bg-primary-dark/90 transition-colors"
        onClick={() => router.push("/dashboard")}
      >
        <GiShoppingBag className="text-xl" />
        <span>Shop My Style</span>
      </button>
    </div>
  );
};

export default ShopButton;
