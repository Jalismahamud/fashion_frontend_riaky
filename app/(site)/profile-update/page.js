import CommonBtn from "@/components/common/CommonBtn"
import ProfileUpdateForm from "@/components/dashboard/my-profile/ProfileUpdate"

export const metadata = {
    title: "Chique | Update Profile",
    description:
        "Take our style quiz and find your perfect fashion match. Answer 10 simple questions to find your perfect style match",
};


const ProfileUpdate = () => {
    return (
        <div className="max-w-3xl container min-h-screen flex flex-col justify-center items-center sm:py-16 xs:py-12 py-10">
            <h2 className="text-3xl font-bold mb-6">Update Your Profile</h2>
            <CommonBtn link={true} path="/dashboard" className={"rounded-md self-end mt-6 max-w-fit"}>
                Skip to Dashboard
            </CommonBtn>
            <ProfileUpdateForm />
        </div>
    )
}

export default ProfileUpdate