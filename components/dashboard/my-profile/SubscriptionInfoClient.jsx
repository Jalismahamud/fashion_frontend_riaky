'use client';

import Loader from "@/components/common/Loader";
import { useUser } from "@/hooks/get-user.hook";
import { useSubscription } from "@/hooks/subscription.hook";
import { formatDateWithDay } from "@/utils/dateFormat";
import { Result, Descriptions, Tag, List, Modal } from "antd";
import Link from "next/link";

const SubscriptionInfoClient = () => {
    const { userData, isLoading } = useUser();
    const {
        cancelSubscription,
        cancelModal,
        setCancelModal
    } = useSubscription();
    // Loading state
    if (isLoading) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center py-10 text-gray-500">
                <Loader />
                <span className="ml-2">Loading profile information...</span>
            </div>
        );
    }
    // No user data
    if (!userData) {
        return (
            <div className="w-full flex items-center justify-center py-10 text-gray-500">
                <Result
                    status="500"
                    title="Error getting profile information"
                    subTitle="No profile information available."
                />
            </div>
        );
    }
    // destructure
    const { subscription } = userData || {};
    // No subscription
    if (!subscription) {
        return (
            <div className="w-full flex items-center justify-center py-10 text-gray-500">
                <Result
                    status="404"
                    title="No Subscription Found"
                    subTitle="You are not currently subscribed to any plan."
                />
            </div>
        );
    }
    // destructure
    const {
        subscribed,
        status,
        ends_at,
        canceled_at,
        on_grace_period,
        plan,
    } = subscription;
    // functions
    const handleCancelSubscription = () => {
        cancelSubscription.mutate();
    }
    // main render
    return (
        <div className="w-full flex gap-6 flex-col text-black">
            {/* Cancel button */}
            <div className="w-full flex gap-4  justify-end items-center">
                <Link  href="/#subscriptions" className={`bg-primary-dark text-center line-clamp-1 px-2 sm:px-6 sm:w-fit w-full sm:text-lg text-xs py-3 cursor-pointer flex justify-center items-center text-white rounded-md`}>
                    View Subscriptions
                </Link>
                {subscribed && !canceled_at && (
                    <button onClick={() => setCancelModal(true)} className="text-center line-clamp-1 px-2 bg-black sm:px-6 sm:w-fit w-full sm:text-lg text-xs py-3 cursor-pointer flex justify-center items-center text-white rounded-md">
                        Cancel Subscription
                    </button>
                )}
            </div>

            {/* Subscription Details */}
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Plan Name">
                    {plan?.name || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Subscribed">
                    {subscribed ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Tag color={status === "active" ? "green" : "red"}>
                        {status || "N/A"}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                    {plan ? `${plan.price} ${plan.currency} / ${plan.interval}` : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Trial Days">
                    {plan?.trial_days ?? "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="On Grace Period">
                    {on_grace_period ? "Yes" : "No"}
                </Descriptions.Item>
                <Descriptions.Item label="Ends At">
                    {ends_at ? formatDateWithDay(ends_at) : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Canceled At">
                    {canceled_at ? formatDateWithDay(canceled_at) : "N/A"}
                </Descriptions.Item>
            </Descriptions>
            {/* Features List */}
            {plan?.features && (
                <div className="w-full">
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <List
                        bordered
                        dataSource={plan.features}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </div>
            )}
            {/* Cancel Subscription Modal */}
            <Modal
                open={cancelModal}
                title="Cancel Subscription"
                centered
                closable={false}
                width={500}
                okButtonProps={{
                    style: { backgroundColor: "black", borderColor: "black", color: "white" },
                    disabled: cancelSubscription.isPending, // Disable when loading
                }}
                okText={cancelSubscription.isPending ? "Cancelling..." : "Yes, Cancel"}
                cancelText="No, Keep it"
                onCancel={() => setCancelModal(false)}
                onOk={handleCancelSubscription}
            >
                <p>Are you sure you want to cancel your subscription?</p>
            </Modal>
        </div>
    );
};

export default SubscriptionInfoClient;
