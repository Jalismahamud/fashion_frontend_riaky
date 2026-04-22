import { TiTick } from "react-icons/ti";
import CommonBtn from "../common/CommonBtn";
import { motion } from "framer-motion";
import { useUser } from "@/hooks/get-user.hook";
import toast from "react-hot-toast";
import { useSubscription } from "@/hooks/subscription.hook";
const PriceCard = ({ item = {}, index, billingType }) => {
    // destructuring props
    const {
        id,
        name,
        description,
        stripe_price_id,
        price,
        interval,
        features = [],
        currency,
    } = item || {};
    // variants
    const flipVariants = {
        hidden: { rotateY: 180, opacity: 0 },
        visible: (index) => ({
            rotateY: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                delay: index * 0.2,
                ease: "easeOut",
            },
        }),
    };
    // destructuring context
    const { accessToken, userData, userRefetch } = useUser();
    // destructure user data
    const {
        user,
        subscription
    } = userData || {};
    // destructure subscription
    const {
        subscribed,
        status,
        type,
        ends_at,
        canceled_at,
        plan = {},
    } = subscription || {};

    // hooks
    const {
        purchaseSubscription,
        updateSubscription
    } = useSubscription();

    // functions
    const handleGetStarted = () => {
        if (!accessToken) {
            toast.error("Please login to get started");
            return;
        }
        purchaseSubscription.mutate(
            id, {
            onSuccess: (response) => {
                userRefetch();
            }
        });
    };

    const handleUpgrade = () => {
        if (!accessToken) {
            toast.error("Please login to get started");
            return;
        }
        if (subscribed) {
            toast("Please cancel your current subscription before switching plans.", {
                icon: "⚠️",
            });
        }
    };

    // main render
    return (
        <motion.div
            key={item.id}
            className="w-full flex flex-col justify-between  gap-5 border rounded-[20px] py-6 px-5 hover:bg-[#B1B0B0] transition duration-500"
            variants={flipVariants}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true, amount: 0 }}
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* name */}
            <span className="rounded-full capitalize text-center 2xs:text-lg 2xs:py-2 py-1 !px-6 max-w-fit text-base text-white bg-black font-primary">
                {name}
            </span>
            {/* price */}
            {
                /* 
                 <p className="2xs:text-2xl text-xl font-semibold text-primary-dark font-primary border-b sm:pb-8 pb-5">
                    $
                    {billingType === "monthly"
                        ? (Number(price) / 12).toFixed(2)
                        : Number(price).toFixed(2)}
                    <span className="text-sm">
                        / {billingType === "monthly" ? "Month" : "Year"}
                    </span>
                </p>
                */
            }
            <p className="2xs:text-2xl text-xl font-semibold text-primary-dark font-primary border-b sm:pb-8 pb-5">
                $
                {Number(price).toFixed(2)}
                <span className="text-sm">
                    / {interval}
                </span>
            </p>
            {/* features */}
            <ul className="space-y-4">
                {features?.map((feature, index) => (
                    <li key={index} className="flex gap-2 items-center">
                        <div className="2xs:size-6 shrink-0 size-5 flex items-center justify-center rounded-full bg-primary-dark ">
                            <TiTick className="text-white 2xs:text-lg text-base" />
                        </div>
                        <span className="2xs:text-base text-base !font-primary">{feature}</span>
                    </li>
                ))}
            </ul>
            {/* CTA button */}
            <div className="w-full">
                {/* get started */}
                {subscribed && plan?.id === id ? (
                    // Current Plan - Check if active
                    status === "active" ? (
                        // Active subscription
                        <div className={`w-full flex justify-center items-center py-3.5 text-white font-medium rounded-full bg-black`}>
                            Current Plan
                        </div>
                    ) : (
                        // Inactive subscription - Link to payment page
                        <FaDivide
                            className={`w-full flex justify-center items-center cursor-pointer py-3.5 text-white font-medium rounded transition-colors bg-red-500 hover:bg-red-600`}
                        >
                            Reactivate Plan
                        </FaDivide>
                    )
                ) : subscribed ? (
                    <button
                        onClick={handleUpgrade}
                        disabled={updateSubscription.isPending}
                        className={`w-full flex justify-center items-center cursor-pointer py-3.5 text-white font-medium rounded-full bg-black`}
                    >
                        {updateSubscription.isPending ? 'Switching plan...' : 'Switch Plan'}
                    </button>
                ) : (
                    // Subscribe Button (shown when not subscribed at all)
                    <CommonBtn type="button" isLoading={purchaseSubscription.isPending} onclick={handleGetStarted}>
                        Get Started
                    </CommonBtn>
                )}
            </div>
        </motion.div>
    )
}

export default PriceCard