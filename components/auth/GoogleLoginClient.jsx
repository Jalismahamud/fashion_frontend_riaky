"use client"
import Image from "next/image";
import google from "@/public/images/icons/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/hooks/auth.hook";
import CommonBtn from "../common/CommonBtn";

const GoogleLoginClient = () => {
    // get google mutation from useAuth
    const {
        googleMutation
    } = useAuth();
    // use google login
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log("Google token:", tokenResponse);
            googleMutation.mutate(tokenResponse.access_token);
        },
        onError: () => {
            console.log("Login Failed");
        },
    });
    // google login
    return (
        <CommonBtn
            className={`bg-white gap-3 text-primary-dark border border-common-border `}
            onclick={() => login()}
            disabled={googleMutation.isPending}
            isLoading={googleMutation.isPending}
            type="button"
        >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                <Image
                    src={google}
                    alt='apple'
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 640px) 20px, 24px"
                />
            </div>
            <span className="text-base">Continue with Google</span>
        </CommonBtn>
    )
}

export default GoogleLoginClient