"use client"

import { Empty } from "antd"
import CommonBtn from "../common/CommonBtn"
import QuizHeader from "./QuizHeader"

const EmptyScreen = ({ refetch }) => {
    return (
        <div className="w-full sm:min-h-[80vh] flex flex-col items-center justify-start text-center gap-5 sm:gap-10 p-2 sm:p-6">
            <QuizHeader />
            {/* Illustration */}
            <Empty
                description={
                    <div className="w-full mt-5 flex flex-col gap-2 max-w-md">
                        <h2 className="xs:text-xl text-base font-semibold text-gray-800">
                            No Quiz Available
                        </h2>
                        <p className="text-gray-600 xs:text-base text-sm">
                            We couldn’t find any quiz questions at the moment.
                            Please check back later or try refreshing to see if new
                            quizzes are available.
                        </p>
                        <CommonBtn onclick={() => refetch()} className={"xs:w-2xs sm:py-3 py-2 rounded-md self-center mt-3 xs:mt-5"}>
                            <span>Try Again!!</span>
                        </CommonBtn>
                    </div>
                }
            />
        </div>
    )
}

export default EmptyScreen