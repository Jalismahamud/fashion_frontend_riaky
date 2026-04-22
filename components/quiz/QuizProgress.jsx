import { Progress } from "antd"

const QuizProgress = ({ current, quizQuestions }) => {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <p className="text-lg">
                Question <b>{current + 1}</b> / {quizQuestions?.length || 0}
            </p>
            <Progress
                showInfo={false}
                strokeColor="#000"
                percent={((current + 1) / quizQuestions?.length) * 100}
            />
        </div>
    )
}

export default QuizProgress