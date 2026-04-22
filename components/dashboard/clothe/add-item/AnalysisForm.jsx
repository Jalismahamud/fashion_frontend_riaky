"use client";
import { useState } from "react";
import ClothingUploader from "./ClothingUploader";
import ItemAddForm from "./ItemAddForm";
import { useUser } from "@/hooks/get-user.hook";
import NotSubscribed from "@/components/common/NotSubscribed";

const AnalysisForm = () => {
  const [aiAnalyze, setAiAnalyze] = useState({
    image: null,
    result: null,
  });
  const [status, setStatus] = useState({
    error: null,
    rawResponse: null,
    isLoading: false,
  });
  const { userData } = useUser();
  const subscription = userData?.subscription || {};
  const { subscribed, status: subscriptionStatus, ends_at, canceled_at, on_grace_period } = subscription;
  // console.log(aiAnalyze?.result?.removed_image_url);
  // ❌ Not subscribed → fallback UI
  if (!subscribed || (subscriptionStatus !== "active" && !on_grace_period)) {
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
  // on submit
  return (
    <div className="w-full flex xl:flex-row flex-col gap-8">
      {/* Clothing Uploader Section */}
      <ClothingUploader aiAnalyze={aiAnalyze} setAiAnalyze={setAiAnalyze} setStatus={setStatus} status={status} />
      {/* final submit form*/}
      <ItemAddForm aiAnalyze={aiAnalyze} setAiAnalyze={setAiAnalyze} setStatus={setStatus} status={status} />
    </div>
  );
};

export default AnalysisForm;
