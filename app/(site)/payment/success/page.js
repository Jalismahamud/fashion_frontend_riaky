import PaymentSuccessClient from "@/components/payment/PaymentSuccessClient";

export const metadata = {
    title: "Chique | Payment Success",
    description: "Your payment was successful. Thank you for your purchase.",
};
const PaymentSuccess = () => {
    return (
        <div className="container min-h-screen py-6 sm:py-10 flex justify-center items-center px-4 sm:px-6">
            <PaymentSuccessClient />
        </div>
    )
}

export default PaymentSuccess