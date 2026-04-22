"use client"
import NotSubscribed from "@/components/common/NotSubscribed"
import MessageScreen from "@/components/dashboard/chat/MessageScreen"
import SendMessage from "@/components/dashboard/chat/SendMessage"
import { useUser } from "@/hooks/get-user.hook"
import { axiosPrivateClient } from "@/lib/axios.private.client"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


const AiChatClient = () => {
    // hooks
    const axiosInstance = axiosPrivateClient();
    const { userData } = useUser();

    // state
    const [message, setMessage] = useState([])
    const [aiTyping, setAiTyping] = useState(false)

    // get chat history
    const {
        data: chatHistory = [],
        isLoading,
        isError,
        refetch,
        isFetching
    } = useQuery({
        queryKey: ['chatHistory'],
        queryFn: async () => {
            const res = await axiosInstance.get('/open-ai/chat/history');
            return res?.data?.data || [];
        }
    });

    // load the chat history
    useEffect(() => {
        if (chatHistory?.length > 0) {
            setMessage(chatHistory);
        }
    }, [chatHistory])

    // handle new message
    const handleNewMessage = (newMessage) => {
        setMessage((prevMessages) => [...prevMessages, newMessage]);
    }

    // remove message by id
    const removeMessage = (id) => {
        setMessage((prev) => prev.filter((msg) => msg.id !== id))
    }

    // get subscription details
    const subscription = userData?.subscription || {};
    const { subscribed, status, ends_at, canceled_at, on_grace_period } = subscription;

    // 🚫 If not subscribed → Show alternative UI
    if (!subscribed || (status !== "active" && !on_grace_period)) {
        return (
            <NotSubscribed>
                <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
                    Chat with our AI stylist is currently <span className="font-medium text-gray-700">locked</span>.
                    Unlock this feature by upgrading to a premium plan — or explore our free demo to try it out.
                </p>
            </NotSubscribed>
        )
    }

    // ✅ Main Chat UI
    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-3 relative ">
            <MessageScreen
                messages={message}
                isLoading={isFetching || isLoading}
                isError={isError}
                aiTyping={aiTyping}
            />
            <SendMessage
                handleNewMessage={handleNewMessage}
                setAiTyping={setAiTyping}
                removeMessage={removeMessage}
            />
        </div>
    )
}

export default AiChatClient
