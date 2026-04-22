
const QuizQuestions = ({ question = {}, isSelected, handleSelectOption }) => {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <h2 className="text-xl font-semibold mb-4">{question?.question_text || "Unknown Question"}</h2>
            <div className="flex w-full flex-col gap-3">
                {question?.options?.map((opt) => (
                    <label
                        key={opt.id}
                        className={`flex items-center gap-3 border rounded-md px-3 py-5 cursor-pointer transition ${isSelected(opt.id)
                            ? "border-black bg-gray-100"
                            : "border-gray-300 hover:border-black"
                            }`}
                    >
                        <input
                            className="accent-black"
                            type="radio"
                            name={`question-${question.id}`}
                            checked={isSelected(opt.id)}
                            onChange={() => handleSelectOption(opt.id)}
                        />
                        {opt?.option_text}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default QuizQuestions