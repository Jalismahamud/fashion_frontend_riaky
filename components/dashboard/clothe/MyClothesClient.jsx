"use client";

import NotSubscribed from "@/components/common/NotSubscribed";
import { useUser } from "@/hooks/get-user.hook";
import Wardrobe from "./Wardrobe";
import OutfitSuggestion from "./OutfitSuggestion";

const MyClothesClient = () => {
    const { userData } = useUser();
    const subscription = userData?.subscription || {};
    const { subscribed, status, ends_at, canceled_at, on_grace_period } = subscription;
    // ❌ Not subscribed → fallback UI
    if (!subscribed || (status !== "active" && !on_grace_period)) {
        return (
            <div className="w-full h-[70vh] flex items-center justify-center">
                <NotSubscribed>
                    <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
                        This wardrobe feature is <span className="font-medium text-gray-700">locked</span>.
                        Unlock this feature by upgrading to a premium plan — or explore our free demo to try it out.
                    </p>
                </NotSubscribed>
            </div>
        );
    }
    // ✅ Subscribed → show features
    return (
        <>
            <Wardrobe />
            <OutfitSuggestion />
        </>
    );
};

export default MyClothesClient;
