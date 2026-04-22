"use client"
import { BsImageFill, BsFillSendFill } from "react-icons/bs"

const MessageInput = ({
    text,
    onTextChange,
    onKeyPress,
    onImageChange,
    fileInputRef,
    onSend,
    hasContent
}) => {
    return (
        <div className="w-full flex gap-3 items-center">
            {/* Image upload button */}
            <label className="cursor-pointer text-2xl text-primary-dark hover:text-primary-darker p-2 rounded-full hover:bg-gray-100 transition-colors">
                <BsImageFill />
                <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={onImageChange}
                    accept="image/*"
                    id="image"
                />
            </label>

            {/* Text input */}
            <div className="flex-1 relative">
                <input
                    type="text"
                    value={text}
                    onChange={onTextChange}
                    onKeyPress={onKeyPress}
                    placeholder="Type your fashion question..."
                    className="w-full xs:p-3 p-2 xs:pr-12 xs:text-base text-sm rounded-lg border border-gray-300 focus:border-primary-dark  outline-none transition-all"
                />
            </div>

            {/* Send button */}
            <button
                type="button"
                onClick={onSend}
                disabled={!hasContent}
                className={`xs:w-12 w-10 xs:h-12 h-10 rounded-lg shrink-0 flex border justify-center items-center transition-colors ${hasContent
                        ? "bg-primary-dark hover:bg-primary-darker text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
            >
                <BsFillSendFill className="text-xl" />
            </button>
        </div>
    )
}

export default MessageInput