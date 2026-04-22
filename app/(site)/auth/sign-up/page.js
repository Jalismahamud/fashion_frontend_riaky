import AppleLogin from "@/components/auth/AppleLogin";
import AuthSubText from "@/components/auth/AuthSubText";
import AuthTitle from "@/components/auth/AuthTitle";
import AuthWrapper from "@/components/auth/AuthWrapper";
import GoogleLogin from "@/components/auth/GoogleLoginClient";
import Or from "@/components/auth/Or";
import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";
// meta data
export const metadata = {
  title: "Chique | Sign Up",
  description:
    "Create your Chique account to discover your unique style, organize your wardrobe, and get personalized fashion recommendations.",
};
// main component
const SignUp = () => {
  // main render
  return (
    <div className="container md:min-h-screen xl:py-32 lg:py-20 md:py-14 sm:py-10 py-8 flex justify-center items-center">
      <AuthWrapper>
        <div className="w-full flex flex-col lg:gap-4 gap-3 justify-start items-center">
          {/* Header */}
          <div className="w-full flex flex-col">
            <AuthTitle title="Sign Up" />
            <div className="flex 3xs:flex-row flex-col 3xs:gap-1 justify-center items-center">
              <AuthSubText text="You have an account?" />
              <Link
                className="underline font-semibold text-primary-dark"
                href={"/auth/sign-in"}
              >
                <span className="xs:!text-lg !text-base">Log In</span>
              </Link>
            </div>
          </div>
          {/* Social */}
          <div className="w-full flex flex-col gap-3 sm:gap-4">
            {/*
              <GoogleLogin />
              <AppleLogin />
            */}
          </div>
          {/* Or */}
          <Or />
          {/* Form */}
          <SignUpForm />
        </div>
      </AuthWrapper>
    </div>
  );
};

export default SignUp;
