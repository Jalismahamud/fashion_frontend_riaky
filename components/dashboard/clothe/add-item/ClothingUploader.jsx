"use client";
import Loader from "@/components/common/Loader";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FiUploadCloud, FiCheckCircle, FiInfo } from "react-icons/fi";

const ClothingUploader = ({ setAiAnalyze, setStatus, status, aiAnalyze }) => {
  const axiosInstance = axiosPrivateClient();
  const [preview, setPreview] = useState(null);
  // post image to server
  const postImage = useMutation({
    mutationKey: ["postImage"],
    // mutationFn
    mutationFn: async (file) => {
      // status
      setStatus({
        error: null,
        rawResponse: null,
        isLoading: true,
      });
      // form data
      const formData = new FormData();
      formData.append("image", file);
      // post
      const response = await axiosInstance.post(
        "/openai/image-analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // return
      return { ...response.data, file };
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Image analyzed successfully!");
      setPreview(URL.createObjectURL(data.file));
      // update data
      setAiAnalyze({
        image: data.file,
        result: data?.data || null,
      });
      // update status
      setStatus({
        error: data?.data?.error || null,
        rawResponse: data?.data?.raw || null,
        isLoading: false,
      });
    },
    onError: (err, file) => {
      console.error("❌ Upload error:", err);
      toast.error(err?.response?.data?.message || "Failed to analyze image");
      // keep preview visible for failed upload too
      setPreview(URL.createObjectURL(file));
      // reset ai analyze state
      setAiAnalyze({
        image: file,
        result: null,
      });
      // update status
      setStatus({
        error: err?.response?.data?.message || "Server error",
        rawResponse: null,
        isLoading: false,
      });
    },
  });
  // on drop
  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      fileRejections.forEach((rej) => {
        rej.errors.forEach((e) => toast.error(e.message));
      });
      return;
    }
    const file = acceptedFiles[0];
    if (!file) return;
    setStatus({ error: null, rawResponse: null });
    postImage.mutate(file);
  };
  // dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });
  // main render
  return (
    <div className="w-full xl:max-w-[50%] flex flex-col h-auto gap-5">
      {/* Upload Notes */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex flex-col gap-2 text-left">
        <div className="flex items-center gap-2 mb-2">
          <FiInfo className="text-black text-xl" />
          <span className="font-semibold text-black">Upload Guidelines</span>
        </div>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Upload a **single clothing item** per image.</li>
          <li>
            Supported formats: <b>JPG, PNG</b>.
          </li>
          <li>
            Maximum file size: <b>5MB</b>.
          </li>
          <li>Ensure the item is clearly visible and well-lit.</li>
          <li>
            Avoid multiple items or cluttered background for better AI analysis.
          </li>
        </ul>
      </div>
      {/* Drag/Drop Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed  rounded-xl p-5 h-full flex flex-col gap-5 items-center justify-center text-center cursor-pointer transition
          ${isDragActive ? "border-black bg-gray-100" : "border-black"
          } 2xs:min-h-[250px]`}
      >
        <input {...getInputProps()} />
        {/* Pending State */}
        {postImage.isPending ? (
          <div className="flex flex-col items-center gap-2">
            <Loader />
            <p className="text-black text-lg font-medium">
              Uploading & Analyzing...
            </p>
            <p className="text-sm text-gray-500">Please wait a few seconds.</p>
          </div>
        ) : status.rawResponse ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              alt="preview"
              className="max-h-80 object-contain  border border-gray-300"
            />
            <p className="text-lg font-semibold text-red-600">
              {status.rawResponse}
            </p>
            <p className="text-base text-gray-500">
              **Please upload a different image. following guidelines**
            </p>
          </div>
        ) : status.error ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              alt="preview"
              className="max-h-80 object-contain  border border-gray-300"
            />
            <p className="text-lg text-red-600">{status.error}</p>
            <p className="text-base text-gray-500">
              **Please upload a different image. following guidelines**
            </p>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={aiAnalyze?.result?.removed_image_url || preview}
              alt="preview"
              className="max-h-80 object-contain  border border-gray-300"
            />
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <FiCheckCircle /> Analysis Complete
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-black">
            <FiUploadCloud className="2xs:text-5xl text-3xl" />
            <p className="text-lg font-medium">
              {isDragActive
                ? "Drop your image here..."
                : "Click or drag an image (max 5MB)"}
            </p>
            <p className="text-sm text-gray-500">Supported formats: JPG, PNG</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingUploader;
