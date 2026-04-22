import CommonBtn from "@/components/common/CommonBtn";
import { MdDashboard } from "react-icons/md";
import ProfileResultClient from "@/components/quiz/ProfileResultClient";

export const metadata = {
  title: "Chique | Your Style Profile",
  description:
    "Take our style quiz and find your perfect fashion match. Answer 10 simple questions to find your perfect style match",
};

const ProfileResults = () => {

  // main render
  return (
    <div className="container min-h-[70vh] px-4 md:px-6 flex flex-col xl:gap-10 sm:gap-8 gap-5 items-center justify-center xl:py-12 xs:py-10 py-8">
      {/** title */}
      <h1 className=" xl:text-4xl sm:text-3xl text-2xl font-bold text-center font-secondary text-primary-dark">
        Your Style Profile Results
      </h1>
      {/** card */}
      <ProfileResultClient />
      {/* Button */}
      <CommonBtn link={true} path="/dashboard" className={"xs:w-3xs sm:py-3.5 py-2 rounded-md"} >
        <MdDashboard className="mr-2" />
        <span>Go to Dashboard</span>
      </CommonBtn>
    </div>
  );
};
export default ProfileResults;
