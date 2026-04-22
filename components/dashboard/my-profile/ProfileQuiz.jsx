import { useUser } from "@/hooks/get-user.hook";

const ProfileQuiz = () => {
    const { userData } = useUser();
    // destructure user data
    const { style_profile } = userData || {};
    // main render
    return (
        <div className="w-full flex flex-col">
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">
                Quiz Answers
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
                {style_profile?.quiz_set?.map((q, i) => (
                    <div
                        key={i}
                        className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                    >
                        <p className="font-medium">{q.question}</p>
                        <p className="text-gray-700 mt-1">
                            <span className="font-semibold">Answer:</span> {q.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileQuiz