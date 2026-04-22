
import Image from "next/image";
import logo from "@/public/images/logo/chique_mini_logo.png";
import AuthWrapper from "@/components/auth/AuthWrapper";
import AuthTitle from "@/components/auth/AuthTitle";
import AuthSubText from "@/components/auth/AuthSubText";
import CommonBtn from "@/components/common/CommonBtn";


export const metadata = {
  title: "Chique | Welcome to Chique",
  description:
    "Take our style quiz and find your perfect fashion match. Answer 10 simple questions to find your perfect style match",
};


const WelcomePage = () => {
  // main render
  return (
    <div className="container min-h-screen py-32 flex justify-center items-center">
      <AuthWrapper>
        <div className="flex flex-col items-center justify-center xs:gap-6 gap-4">
          {/* logo icon */}
          <div className="xs:w-14 w-10">
            <Image alt="Logo" src={logo} className="w-full h-full" />
          </div>
          {/* welcome header */}
          <div className="space-y-2">
            <AuthTitle title="Welcome to Chique" />
            <AuthSubText className=" text-center" text="Your Chique.AI personal assistant" />
          </div>
          {/* welcome text */}
          <AuthSubText
            className="text-[rgba(0,0,0,0.80)] text-center text-base font-medium"
            text="We’re going to ask a few quick questions about your health and lifestyle to create a plan tailored just for you."
          />
          {/* start button */}
          <CommonBtn className={`max-w-[220px]`} link={true} path="/quiz">
            Start Quiz
          </CommonBtn>
        </div>
      </AuthWrapper>
    </div>
  );
};
export default WelcomePage;
