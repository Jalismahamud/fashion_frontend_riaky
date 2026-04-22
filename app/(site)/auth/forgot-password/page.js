
import AuthSubText from "@/components/auth/AuthSubText";
import AuthTitle from "@/components/auth/AuthTitle";
import AuthWrapper from "@/components/auth/AuthWrapper";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Chique | Create New Password",
  description:
    "Your Personal Style Assistant.Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique Al.",
};

const ForgotPassword = () => {
  // main render
  return (
    <div className="container min-h-screen xl:py-32 lg:py-20 md:py-14 sm:py-10 py-8 flex justify-center items-center">
      <AuthWrapper>
        <div className="w-full flex flex-col gap-4 justify-start items-center">
          {/* Header */}
          <div className="w-full flex flex-col gap-2 items-center">
            <AuthTitle title="Forgot Password" />
            <AuthSubText
              text="Please provide your registered email address to receive a password reset code."
              className={"text-center"}
            />
          </div>
          {/* Form */}
          <ForgotPasswordForm />
        </div>
      </AuthWrapper>
    </div>
  );
};
export default ForgotPassword;
