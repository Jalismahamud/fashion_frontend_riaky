import PaymentCancelClient from "@/components/payment/PaymentCancelClient";

export const metadata = {
    title: "Chique | Payment Cancelled",
    description: "Your payment was cancelled. Please try again.",
};
const PaymentCancel = () => {
    return (
        <div className="container min-h-screen py-6 sm:py-10 flex justify-center items-center px-4 sm:px-6">
            <PaymentCancelClient />
        </div>
    )
}

export default PaymentCancel