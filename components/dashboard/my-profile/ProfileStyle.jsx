import CommonBtn from '@/components/common/CommonBtn';
import { useUser } from '@/hooks/get-user.hook';

const ProfileStyle = () => {
    const { userData } = useUser();
    // destructure user data
    const { style_profile } = userData || {};
    
    // main render
    return (
        <div className="w-full flex flex-col gap-3 text-black">
            <CommonBtn link={true} path="/quiz" className={`max-w-fit self-end min-h-fit rounded`}>
                Answer Quiz Again
            </CommonBtn>
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">
                Style Profile
            </h2>
            <div className="space-y-5 text-sm sm:text-base">
                <div>
                    <p className="font-medium">Type</p>
                    <p className="text-gray-700">{style_profile?.type}</p>
                </div>
                <div>
                    <p className="font-medium">Details</p>
                    <p className="text-gray-700 leading-relaxed">
                        {style_profile?.details}
                    </p>
                </div>
                <div>
                    <p className="font-medium">Keywords</p>
                    <p className="text-gray-700 italic">{style_profile?.keywords}</p>
                </div>
                <div>
                    <p className="font-medium">Score Breakdown</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2">
                        {Object.entries(style_profile?.score_breakdown || {}).map(
                            ([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between border px-3 py-2 rounded text-gray-800 text-sm sm:text-base"
                                >
                                    <span>{key}</span>
                                    <span>{value}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileStyle