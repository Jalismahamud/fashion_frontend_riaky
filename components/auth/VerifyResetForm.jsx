"use client";
import { useAuth } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthTitle from "./AuthTitle";
import { Input } from "antd";
import { maskEmail } from "@/utils/maskEmail";
import CommonBtn from "../common/CommonBtn";

const VerifyResetForm = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [seconds, setSeconds] = useState(25);
    const [resendActive, setResendActive] = useState(false);
    const { resendOtp, verifyResetOtp } = useAuth();
    const router = useRouter()
    useEffect(() => {
        const RESET_EMAIL_KEY = process.env.NEXT_PUBLIC_RESET_EMAIL_KEY || "resetEmail";
        const verifyEmail = sessionStorage.getItem(RESET_EMAIL_KEY);
        if (!verifyEmail) {
            router.push("/auth/forgot-password");
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
        verifyResetOtp.mutate({ otp, email: email });
    };
    // handle resend 
    const handleResend = () => {
        if (!resendActive) return;
        setSeconds(25);
        setResendActive(false);
        resendOtp.mutate({ email: email });
    };
    //   Countdown timer effect
    useEffect(() => {
        let timer;
        if (seconds > 0) {
            timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
        } else {
            setResendActive(true);
        }
        return () => clearInterval(timer);
    }, [seconds]);

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
                    isLoading={verifyResetOtp.isPending}
                    disabled={verifyResetOtp.isPending || resendOtp.isPending}
                    className="max-w-[300px]"
                    onclick={handleSubmit}
                >
                    Verify Code
                </CommonBtn>
                {/* resend code */}
                <p className="text-base  text-gray-400 font-primary text-center">
                    Don&apos;t receive the code?{" "}
                    {resendActive ? (
                        <span
                            className="cursor-pointer underline"
                            onClick={handleResend}
                        >
                            Resend
                        </span>
                    ) : (
                        <span>Resend in {seconds} seconds</span>
                    )}
                </p>
            </div>
        </div >
    )
}

export default VerifyResetForm