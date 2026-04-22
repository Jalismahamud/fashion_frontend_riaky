"use client";

import Loader from "@/components/common/Loader";
import { getWardrobeItemDetails } from "@/lib/api/get-item-details";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal, Result } from "antd";
import { useEffect, useState } from "react";
import { FiLink2 } from "react-icons/fi";
import StyledClothe from "./StyledClothe";
import Link from "next/link";
import { toast } from "react-hot-toast";

const ClotheDetailsClient = ({ clothe_slug }) => {
  // State
  const [isStyled, setIsStyled] = useState(false);
  const [styledItem, setStyledItem] = useState(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  // Dynamic loading messages
  const loadingMessages = [
    "Styling your item...",
    "Analyzing your style preference...",
    "Picking the perfect match...",
    "Finalizing the look...",
    "Almost ready...",
    "Just a moment more...",
  ];

  // Axios instance
  const axiosInstance = axiosPrivateClient();

  // Fetch clothe details
  const {
    data: clotheDetails = {},
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["wardrobeItemDetails", clothe_slug],
    queryFn: () => getWardrobeItemDetails(axiosInstance, {}, clothe_slug),
    retry: false,
  });

  // Destructure clothe details
  const {
    id,
    slug,
    clouth_type,
    material,
    pattern,
    user_id,
    category_id,
    color,
    season,
    image_path,
    item_name,
    buying_info,
    site_link,
  } = clotheDetails || {};

  // Mutation to style the dress
  const styleDressMutation = useMutation({
    mutationKey: ["style-dress", id],
    mutationFn: async () => {
      const response = await axiosInstance.post(`/style-item`, {
        item_id: id,
        image_path
      });
      return response.data;
    },
    onSuccess: (response) => {
      setStyledItem(response?.data);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });



  // Handle style button click
  const handleStyleDress = () => {
    setIsStyled(true); // open modal
    if (!styledItem) {
      styleDressMutation.mutate(); // only call API if it's not already styled
    }
  };

  // Cycle loading messages while styling
  useEffect(() => {
    let interval;
    if (styleDressMutation.isPending) {
      interval = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 5000);
    } else {
      setLoadingMsgIndex(0); // reset when done
    }
    return () => clearInterval(interval);
  }, [styleDressMutation.isPending]);

  // Error state
  if (isError || !clotheDetails) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <Result
          status="404"
          title="404 Not Found"
          subTitle="Sorry, the item you are looking for is not available."
        />
      </div>
    );
  }

  // Loading state
  if (isLoading || isFetching) {
    return (
      <div className="w-full h-[70vh] flex flex-col gap-3 justify-center items-center">
        <Loader className="size-10" />
        <p className="text-2xl">Loading item details...</p>
      </div>
    );
  }

  // Main render
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 bg-white p-4 sm:p-5 rounded-md border">
      {/* Image */}
      <div className="w-full h-72 sm:h-[360px] rounded-xl overflow-hidden p-2 bg-gray-200 ">
        <img
          src={image_path}
          alt={item_name || "Clothing Item"}
          className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Item Info */}
      <div className="flex w-full flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          {item_name || "Unnamed Item"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full sm:gap-y-2 text-gray-700">
          <p>
            <span className="font-medium">Type:</span> {clouth_type || "N/A"}
          </p>
          <p>
            <span className="font-medium">Material:</span> {material || "N/A"}
          </p>
          <p>
            <span className="font-medium">Pattern:</span> {pattern || "N/A"}
          </p>
          <p>
            <span className="font-medium">Color:</span> {color || "N/A"}
          </p>
          <p>
            <span className="font-medium">Season:</span> {season || "N/A"}
          </p>
        </div>
        {buying_info && (
          <p className="text-gray-700">
            <span className="font-medium">Buying Info:</span> {buying_info}
          </p>
        )}
        {site_link && (
          <a
            href={site_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-fit underline text-primary-dark font-medium hover:underline"
          >
            <FiLink2 className="text-lg" /> View on Store
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-3 sm:gap-4">
        <Link
          href={`/dashboard`}
          className="w-full cursor-pointer flex items-center justify-center gap-2 bg-gray-100 border hover:bg-gray-200 transition rounded-md py-4 font-medium text-gray-700"
        >
          Ask a Question
        </Link>
        <button
          onClick={handleStyleDress}
          type="button"
          className="w-full cursor-pointer flex items-center justify-center gap-2 bg-primary-dark text-white hover:bg-primary rounded-md py-4 font-medium transition"
        >
          Style It
        </button>
      </div>

      {/* Styled Item Modal */}
      <Modal
        open={isStyled}
        onCancel={() => setIsStyled(false)}
        footer={null}
        width={1200}
        className="!my-3"
        centered
      >
        <div className="w-full flex flex-col gap-6">
          {styleDressMutation.isPending ? (
            <div className="w-full h-[400px] flex flex-col gap-3 justify-center items-center">
              <Loader className="size-10" />
              <p className="text-2xl">{loadingMessages[loadingMsgIndex]}</p>
            </div>
          ) : styledItem ? (
            <StyledClothe styledItem={styledItem} />
          ) : (
            <div className="w-full h-[400px] flex flex-col gap-3 justify-center items-center">
              <Result
                status="404"
                title="404 Not Found"
                subTitle="Sorry, styled item details could not be loaded."
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ClotheDetailsClient;
