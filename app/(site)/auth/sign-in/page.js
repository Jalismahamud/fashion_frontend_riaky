import AppleLogin from "@/components/auth/AppleLogin";
import AuthSubText from "@/components/auth/AuthSubText";
import AuthTitle from "@/components/auth/AuthTitle";
import AuthWrapper from "@/components/auth/AuthWrapper";
import GoogleLoginClient from "@/components/auth/GoogleLoginClient";
import Or from "@/components/auth/Or";
import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";

export const metadata = {
  title: "Chique | Sign In",
  description:
    "Securely access your Chique account to manage your style profile, wardrobe, and personalized recommendations.",
};

const SignIn = () => {
  // main render
  return (
    <div className="container md:min-h-screen xl:py-32 lg:py-20 md:py-14 sm:py-10 py-8 flex justify-center items-center ">
      <AuthWrapper>
        <div className="w-full flex flex-col gap-4 justify-start items-center">
          {/* Header */}
          <div className="w-full flex flex-col">
            <AuthTitle title="Log in" />
            <div className="flex 3xs:flex-row flex-col 3xs:gap-1 justify-center items-center">
              <AuthSubText text="Don’t have an account?" />
              <Link
                className="underline font-semibold text-primary-dark"
                href={"/auth/sign-up"}
              >
                <span className="xs:!text-lg !text-base">Sign up</span>
              </Link>
            </div>
          </div>
          {/* Social */}
          <div className="w-full flex flex-col gap-3 sm:gap-4">
            <GoogleLoginClient />
            {/*
              <AppleLogin />
            */}
          </div>
          {/* Or */}
          <Or />
          {/* Form */}
          <SignInForm />
        </div>
      </AuthWrapper>
    </div>
  );
};
export default SignIn;
