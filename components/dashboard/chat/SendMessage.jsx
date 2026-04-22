"use client"
import { useState, useRef, useCallback } from "react"
import ImagePreview from "./ImagePreview"
import { BsFillSendFill, BsImageFill } from "react-icons/bs"
import { useMutation } from "@tanstack/react-query"
import { axiosPrivateClient } from "@/lib/axios.private.client"
import { v4 as uuidv4 } from "uuid"
import toast from "react-hot-toast"
import { formatMessage } from "@/utils/formatMessage"

const SendMessage = ({ handleNewMessage, removeMessage, setAiTyping }) => {
    const axiosInstance = axiosPrivateClient()
    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null)

    // remove image
    const removeImage = useCallback(() => {
        setImage(null)
        setImagePreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [])

    // send message to server
    const sendMessage = useMutation({
        mutationKey: ["sendMessage"],
        mutationFn: async ({ text, image }) => {
            const formData = new FormData()
            if (image) formData.append("image", image)
            if (text) formData.append("prompt", text)
            const res = await axiosInstance.post("/open-ai/chat", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            return res.data.data || {}
        },
        onSuccess: (data, variables) => {
            const aiMessage = {
                id: uuidv4(),
                role: "assistant",
                message: data.response || "",
                created_at: data.created_at,
                image_url: data.image_url || null,
                response_type: data.response_type || "text",
                time_ago: data.time_ago || "just now",
            }
            handleNewMessage(aiMessage)
            setAiTyping(false) // stop typing after AI response
        },
        onError: (err, variables) => {
            console.error(err)
            toast.error(err?.response?.data?.message || "Something went wrong")
            // remove the optimistic user message if API fails
            if (variables?.optimisticId) {
                removeMessage(variables.optimisticId)
            }
            setAiTyping(false) // stop typing on failure too
        },
    })

    // handle image
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => setImagePreview(reader.result)
            reader.readAsDataURL(file)
        }
    }

    // handle send message
    const handleSendMessage = () => {
        if (!text.trim() && !image) return // need at least text or image

        // optimistic user message
        const optimisticId = uuidv4()
        const userMessage = {
            id: optimisticId,
            role: "user",
            message: text,
            image_url: imagePreview || null,
            created_at: new Date().toISOString(),
        }
        handleNewMessage(userMessage)
        // clear immediately after optimistic update
        setText("")
        removeImage()
        // set typing state
        setAiTyping(true)
        // call API
        sendMessage.mutate({ text, image, optimisticId })
    }

    // disable send button if no text and no image or if sending
    const isDisabled = sendMessage.isPending || (!text.trim() && !image)

    return (
        <div className="w-full shrink-0 flex flex-col gap-4 justify-start items-start p-2 2xs:p-4 bg-white rounded-lg shadow-sm">
            {imagePreview && (
                <ImagePreview imagePreview={imagePreview} onRemove={removeImage} />
            )}

            <div className="w-full flex gap-3 items-center">
                {/* Image upload button */}
                <label className="cursor-pointer text-2xl text-primary-dark hover:text-primary-darker p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <BsImageFill />
                    <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </label>

                {/* Text input */}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your fashion question..."
                        className="w-full xs:p-3 p-2 xs:pr-12 text-base  rounded-lg border border-gray-300 focus:border-primary-dark outline-none transition-all"
                        disabled={sendMessage.isPending}
                    />
                </div>

                {/* Send button */}
                <button
                    type="button"
                    className={`xs:w-12 w-10 xs:h-12 h-10 rounded-lg shrink-0 flex border justify-center items-center transition-colors cursor-pointer ${isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-primary-dark hover:text-white"
                        }`}
                    onClick={handleSendMessage}
                    disabled={isDisabled}
                >
                    <BsFillSendFill className="text-xl" />
                </button>
            </div>
        </div>
    )
}

export default SendMessage
