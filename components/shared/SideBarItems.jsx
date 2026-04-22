import { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { GrCoatCheck } from "react-icons/gr";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { FaLock } from "react-icons/fa6";
import { Modal } from "antd";
import NavLink from "../common/NavLink";
import { useUser } from "@/hooks/get-user.hook";
import NotSubscribed from "../common/NotSubscribed";

const SideBarItems = ({ setIsModalOpen }) => {
    const { userData } = useUser();
    const subscription = userData?.subscription || {};
    const { subscribed } = subscription;
    const [showSubModal, setShowSubModal] = useState(false);

    // Define nav items
    const navItems = [
        {
            path: "/dashboard",
            name: "Chat",
            icon: <BsChatDots />,
            end: true,
            locked: !subscribed, // free if subscribed
        },
        {
            path: "/dashboard/my-clothes",
            name: "My Closet",
            icon: <GrCoatCheck />,
            locked: !subscribed,
        },
        {
            path: "/",
            name: "Explore",
            icon: <FaGlobeAmericas />,
            locked: false,
        },
        {
            path: "/dashboard/feedback",
            name: "Feedback",
            icon: <MdOutlineMessage />,
            locked: false,
        },
    ];
    // main render
    return (
        <>
            <nav className="w-full pl-3 py-8 h-screen flex flex-col justify-start gap-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        href={item.locked ? "#" : item.path}
                        end={item.end}
                        onClick={(e) => {
                            if (item.locked) {
                                e.preventDefault();
                                setShowSubModal(true); // 🚀 show AntD modal
                            }
                        }}
                        className={`w-full rounded-tl-sm text-xl rounded-bl-sm px-4 py-3 flex justify-start items-center gap-3 transition-colors duration-300 ${item.locked
                            ? "text-gray-400 hover:text-gray-500"
                            : "text-primary-dark hover:bg-primary-dark hover:text-white"
                            }`}
                        activeClassName="bg-primary-dark text-white"
                    >
                        <span className="text-2xl shrink-0">
                            {item.locked ? <FaLock /> : item.icon}
                        </span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}

                {/* Sign Out Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full cursor-pointer text-left text-primary-dark hover:bg-primary-dark hover:text-white rounded-tl-sm text-xl rounded-bl-sm px-4 py-3 flex justify-start items-center gap-3 transition-colors duration-300"
                >
                    <span className="text-2xl shrink-0">
                        <PiSignOutBold className="text-[26px]" />
                    </span>
                    <span>Sign Out</span>
                </button>
            </nav>

            {/* Subscription Modal */}
            <Modal
                title="Upgrade Required"
                open={showSubModal}
                onCancel={() => setShowSubModal(false)}
                footer={null}
                centered
            >
                <NotSubscribed>
                    <p className="!text-gray-500 mt-3 max-w-md leading-relaxed">
                        This feature is <span className="font-medium text-gray-700">locked</span>.
                        Unlock this feature by upgrading to a premium plan — or explore our free demo to try it out.
                    </p>
                </NotSubscribed>
            </Modal>
        </>
    );
};

export default SideBarItems;
