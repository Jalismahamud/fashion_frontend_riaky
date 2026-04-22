import React from "react";
import { FiInfo } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const StyledClothe = ({ styledItem = {} }) => {
    const {
        item_name,
        image_path: original_image,
        clouth_type,
        material,
        pattern,
        buying_info,
        site_links = [],
        color,
        season,
        styling_suggestion,
        generated_outfit_image
    } = styledItem || {};

    return (
        <div className="w-full flex flex-col-reverse lg:flex-row gap-6">
            {/* Left Side - Other Matched Outfit */}
            <div className="w-full  flex-col gap-2 hidden lg:w-[50%] overflow-hidden lg:flex items-center justify-start">
                {generated_outfit_image?.length > 0 ? (
                    <div className="w-full bg-gray-100 p-6 h-full rounded-xl shadow-sm relative flex flex-wrap justify-center items-center gap-6">
                        <span className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-2 text-sm rounded">
                            Other Matched Outfit by AI
                        </span>
                        {generated_outfit_image?.map((item) => (
                            <div
                                key={item?.id}
                                className="w-[250px] h-[250px] flex flex-col items-center justify-center p-2 rounded-lg hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={item?.image_path}
                                    alt={item?.item_name || "Clothing Item"}
                                    className="w-full h-full object-contain mb-2"
                                />
                                <p className="text-xs text-gray-600 text-center mt-2">
                                    {item?.item_name}
                                </p>
                                <p className="text-xs text-primary-dark">{item?.clouth_type}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full bg-gray-100 p-3 h-80 flex justify-center items-center md:h-[400px] rounded-xl overflow-hidden relative">
                        <p className="text-gray-500 text-center px-4">
                            No additional outfit generated.
                            Please try again with a different clothing item for AI-generated
                            styling suggestions.
                        </p>
                    </div>
                )}
            </div>
            {/* Right Side - Details */}
            <div className="w-full lg:w-[50%] flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-gray-700">
                    ✨ Style Details Suggested by AI
                </h2>

                {/* Item Name */}
                <h2 className="text-2xl font-bold text-gray-900">{item_name}</h2>

                {/* Item Image */}
                <div className="w-full h-64 rounded-xl overflow-hidden p-2 bg-gray-200">
                    <img
                        src={original_image}
                        alt={item_name || "Clothing Item"}
                        className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="lg:hidden block">
                    {generated_outfit_image?.length > 0 ? (
                        <div className="w-full bg-gray-100 p-6 h-full rounded-xl shadow-sm relative flex flex-wrap justify-center items-center gap-6">
                            <span className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-2 text-sm rounded">
                                Other Matched Outfit by AI
                            </span>
                            {generated_outfit_image?.map((item) => (
                                <div
                                    key={item?.id}
                                    className="lg:w-[250px] lg:h-[250px] w-40 h-40 flex flex-col items-center justify-center p-2 rounded-lg hover:scale-105 transition-transform duration-300"
                                >
                                    <img
                                        src={item?.image_path}
                                        alt={item?.item_name || "Clothing Item"}
                                        className="w-full h-full object-contain mb-2"
                                    />
                                    <p className="text-xs text-gray-600 text-center mt-2">
                                        {item?.item_name}
                                    </p>
                                    <p className="text-xs text-primary-dark">{item?.item_name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full bg-gray-100 p-3 h-80 flex justify-center items-center md:h-[400px] rounded-xl overflow-hidden relative">
                            <p className="text-gray-500 text-center px-4">
                                No additional outfit generated.
                                Please try again with a different clothing item for AI-generated
                                styling suggestions.
                            </p>
                        </div>
                    )}
                </div>
                {/* Item Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-700">
                    <p>
                        <span className="font-medium">Type:</span> {clouth_type}
                    </p>
                    <p>
                        <span className="font-medium">Material:</span> {material}
                    </p>
                    <p>
                        <span className="font-medium">Pattern:</span> {pattern}
                    </p>
                    <p>
                        <span className="font-medium">Color:</span> {color}
                    </p>
                    <p>
                        <span className="font-medium">Season:</span> {season}
                    </p>
                </div>

                {/* Styling Suggestion */}
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <h3 className="font-semibold text-primary-dark mb-2">
                        Styling Suggestion
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {styling_suggestion}
                    </p>
                    <div className="mt-3 flex items-start gap-2 text-sm text-gray-500">
                        <FiInfo className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                        <b>
                            This suggestion is AI-generated and may not always be accurate.
                            Please use your own judgment and style preferences.
                        </b>
                    </div>
                </div>

                {/* Buying Info */}
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Buying Information
                    </h2>
                    {buying_info && <ReactMarkdown>{buying_info}</ReactMarkdown>}

                    {/* Links */}
                    <div className="flex flex-wrap gap-2">
                        {site_links?.map((link, idx) => (
                            <a
                                key={idx}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 text-sm bg-gray-100 rounded-md border hover:bg-gray-200 transition"
                            >
                                {new URL(link).hostname.replace("www.", "")}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StyledClothe;
