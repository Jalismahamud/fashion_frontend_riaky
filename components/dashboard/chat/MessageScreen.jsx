"use client";
import { Empty } from "antd";
import { useEffect, useRef } from "react";
import { BsPersonFill, BsRobot } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";

const renderMarkdown = (text) => {
    if (!text) return null;

    // STEP 1: Fix malformed <ul>/<li> HTML from AI
    const fixed = text
        .replace(/<\/ul>\s*<li>/g, '<li>') // remove stray closing </ul> before next <li>
        .replace(/<\/li>\s*(<strong>|\d+\.)/g, '</li></ul>$1') // close <ul> before next strong or numbered list
        .replace(/(<\/li>)(\s*<\/ul>)?/g, '</li>') // cleanup duplicate closings
        .replace(/(<strong>\s*\d+\.)/g, '<ul><li>$1') // open a list before strong numbered items
        .replace(/<\/ul>\s*<\/ul>/g, '</ul>'); // remove extra nesting
    const html = marked.parse(fixed || "");
    // STEP 2: Sanitize HTML to avoid XSS
    const sanitized = DOMPurify.sanitize(html);

    // STEP 3: Render clean HTML safely
    return (
        <div
            className=""
            dangerouslySetInnerHTML={{ __html: sanitized }}
        />
    );
};

const MessageScreen = ({ messages = [], isLoading, isError, aiTyping }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, aiTyping]);

    return (
        <div className="w-full h-full flex flex-col justify-start overflow-y-auto xs:p-4 space-y-6">
            {isLoading ? (
                <div className="flex flex-col h-full items-center justify-center text-gray-500 py-10">
                    <FiLoader className="animate-spin text-3xl mb-2" />
                    <p className="text-sm">AI is thinking...</p>
                </div>
            ) : isError ? (
                <div className="flex flex-col h-full items-center justify-center text-gray-500 py-10">
                    <Empty
                        description={
                            <div className="flex flex-col items-center">
                                <MdErrorOutline className="text-3xl mb-2" />
                                <p className="text-sm">Something went wrong. Please try again.</p>
                            </div>
                        }
                    />
                </div>
            ) : messages?.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center text-gray-500 py-10">
                    <BsRobot className="animate-bounce text-4xl mb-2" />
                    <p className="sm:text-2xl text-base text-center">
                        No messages yet. Start the conversation!
                    </p>
                </div>
            ) : (
                <>
                    {messages.map((item) => (
                        <div
                            key={item.id}
                            className={`flex ${item.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`flex max-w-5xl ${item.role === "user" ? "flex-row-reverse" : "flex-row"
                                    } items-start gap-3`}
                            >
                                {/* Avatar */}
                                <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${item.role === "user"
                                        ? "bg-primary-dark text-white"
                                        : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {item.role === "user" ? <BsPersonFill /> : <BsRobot />}
                                </div>

                                {/* Message content */}
                                <div
                                    className={`rounded-lg border flex flex-col gap-2 px-5 py-4 ${item.role === "user"
                                        ? "rounded-tr-none"
                                        : "rounded-tl-none bg-gray-100"
                                        }`}
                                >
                                    {item?.image_url && (
                                        <img
                                            src={item.image_url}
                                            alt="User uploaded"
                                            className="xs:max-w-xs max-w-48 xs:max-h-64 max-h-40 rounded-md object-contain"
                                            suppressHydrationWarning
                                        />
                                    )}

                                    {item.role === "assistant"
                                        ? renderMarkdown(item.message)
                                        : <p className="whitespace-pre-wrap">{item.message}</p>}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* AI typing indicator */}
                    {aiTyping && (
                        <div className="flex justify-start">
                            <div className="flex max-w-3xl flex-row items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-700">
                                    <BsRobot />
                                </div>
                                <div className="rounded-lg border bg-gray-100 rounded-tl-none px-4 py-3 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageScreen;
