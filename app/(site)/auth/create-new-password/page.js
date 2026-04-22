import AuthSubText from "@/components/auth/AuthSubText";
import AuthTitle from "@/components/auth/AuthTitle";
import AuthWrapper from "@/components/auth/AuthWrapper";
import CreatePasswordForm from "@/components/auth/CreatePasswordForm";

export const metadata = {
  title: "Chique | Create New Password",
  description:
    "Your Personal Style Assistant.Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique Al.",
};

const CreateNewPassword = () => {
  // main render
  return (
    <div className="container min-h-screen py-32 flex justify-center items-center">
      <AuthWrapper>
        <div className="w-full flex flex-col gap-4 justify-start items-center">
          {/* Header */}
          <div className="w-full flex flex-col xs:gap-2 items-center">
            <AuthTitle title="Create New Password" />
            <AuthSubText className="text-center" text="Please create a strong password for your account" />
          </div>
          {/* create password form */}
          <CreatePasswordForm />
        </div>
      </AuthWrapper>
    </div>
  );
};
export default CreateNewPassword;
