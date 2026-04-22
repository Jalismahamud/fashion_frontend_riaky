
import AuthWrapper from "@/components/auth/AuthWrapper";
import VerifyResetForm from "@/components/auth/VerifyResetForm";

// meta data
export const metadata = {
  title: "Chique | Verify Reset Password",
  description:
    "Create your Chique account to discover your unique style, organize your wardrobe, and get personalized fashion recommendations.",
};
const ResetVerification = () => {
  // verify user
  return (
    <div className="container min-h-screen xl:py-32 lg:py-20 md:py-14 sm:py-10 py-8 flex justify-center items-center">
      <AuthWrapper>
        <VerifyResetForm />
      </AuthWrapper>
    </div>
  );
};
export default ResetVerification;
