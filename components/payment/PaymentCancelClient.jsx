"use client";
import { Result } from "antd"
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const PaymentCancelClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    useEffect(() => {
        if (!sessionId) {
            // Prevent direct access
            router.replace("/");
        }
    }, [sessionId, router]);
    // main render
    return (
        <Result
            status="error"
            title="Payment Cancelled"
            subTitle="It looks like your payment was cancelled. Please try again if you want to continue."
            extra={[
                <div key="buttons" className="flex gap-4 w-full justify-between items-center">
                    <Link className="!bg-black px-4 py-3 w-full flex justify-center items-center text-xl !text-white" href="/#subscriptions" key="pricing">
                        View Pricing
                    </Link>,
                    <Link className="!bg-black px-4 py-3 w-full flex justify-center items-center text-xl !text-white" href="/" key="home">
                        Home
                    </Link>
                </div>
            ]}
        />
    )
}

export default PaymentCancelClient