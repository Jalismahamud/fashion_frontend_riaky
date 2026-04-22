import { FaUser } from "react-icons/fa6"
import StarRating from "../common/StarRating"

const TestimonialCard = ({ item = {} }) => {
    const {
        id,
        user_name,
        user_avatar,
        rating,
        review_text
    } = item || {}
    // main render
    return (
        <div className='2xs:w-96 w-72 rounded-2xl text-white transition-all duration-500 ease-in-out bg-primary-dark flex flex-col items-center justify-between gap-4 mr-5 border 2xs:h-72 h-52 2xs:p-6 p-4'>
            <StarRating className='text-[#FFD700] shrink-0' rating={rating} />
            <p className='text-base text-center line-clamp-3'>
                {review_text || "N/A"}
            </p>
            <div className='size-12 border flex items-center justify-center shrink-0 rounded-full overflow-hidden'>
                {
                    user_avatar ? (
                        <img src={user_avatar} alt={user_name} className='w-full h-full object-cover' />
                    ) : (
                        <FaUser className='text-xl' />
                    )
                }
            </div>
            <p className='xs:text-lg 2xs:text-base text-sm font-medium'>{user_name || "N/A"}</p>
        </div>
    )
}

export default TestimonialCard