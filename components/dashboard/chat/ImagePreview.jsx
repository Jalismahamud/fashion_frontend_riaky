"use client"
import { BsX } from "react-icons/bs"
const ImagePreview = ({ imagePreview, onRemove }) => {
    return (
        <div className="relative w-full">
            <div className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={onRemove}
                    className="absolute top-1 cursor-pointer right-1 bg-gray-800 bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-100 transition-all"
                >
                    <BsX className="text-sm" />
                </button>
            </div>
        </div>
    )
}

export default ImagePreview