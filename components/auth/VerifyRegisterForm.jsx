"use client"

import { useEffect, useState } from "react";
import CommonBtn from "../common/CommonBtn";
import { Input } from "antd";
import AuthTitle from "./AuthTitle";
import { maskEmail } from "@/utils/maskEmail";
import { useAuth } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";

const VerifyRegisterForm = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const { verifyOtp } = useAuth();
    const router = useRouter()
    const VERIFY_EMAIL_KEY = process.env.NEXT_PUBLIC_VERIFY_EMAIL_KEY || "verifyEmail";
    useEffect(() => {
        const verifyEmail = sessionStorage.getItem(VERIFY_EMAIL_KEY);
        if (!verifyEmail) {
            // If no email found, redirect to signup page
            router.push("/auth/sign-up");
            return;
        }
        setEmail(verifyEmail);
    }, [router]);
    // otp change handler
    const OtpChange = (val) => {
        setOtp(val);
    };
    // final submit
    const handleSubmit = () => {
        if (otp.length !== 4)
            return toast.error("Please enter a valid 4-digit code");
        verifyOtp.mutate({ otp, email: email });
    };
    // otp component
    return (
        <div className="w-full flex flex-col gap-4 justify-start items-center">
            {/* Header */}
            <div className="w-full flex flex-col gap-3 items-center">
                <AuthTitle title="Enter Verification Code" />
                <h5 className="text-center xs:text-xl 3xs:text-lg text-base text-gray-400 font-primary">
                    Enter Confirm code sent to your email address <br />
                    <span>{maskEmail(email) || "--"}</span>
                </h5>
            </div>
            {/* Otp */}
            <div className="w-full font-medium flex flex-col gap-3 justify-start items-center">
                <p className="text-red-600 hidden">***This is for testing purpose only in production this will be removed***</p>
                <p className="text-red-400 hidden font-semibold">Your Verification Code: {otp}</p>
                <div className="w-full flex gap-4 justify-center items-enter mb-3">
                    <Input.OTP
                        length={4}
                        value={otp}
                        onChange={(val) => OtpChange(val)}
                    />
                </div>
                <CommonBtn
                    type="button"
                    isLoading={verifyOtp.isPending}
                    className="max-w-[300px]"
                    disabled={verifyOtp.isPending || otp.length !== 4 || !email || !otp}
                    onclick={handleSubmit}
                >
                    Verify Code
                </CommonBtn>
            </div>
        </div >
    )
}

export default VerifyRegisterForm