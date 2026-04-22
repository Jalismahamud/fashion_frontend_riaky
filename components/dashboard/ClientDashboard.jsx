"use client";
import NavBar from "@/components/shared/NavBar";
import SideBar from "@/components/shared/SideBar";
import { useUser } from "@/hooks/get-user.hook";
import { getDaysLeft } from "@/utils/getDaysLeft";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ClientDashboard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useUser();
  const subscription = userData?.subscription || {};
  const { subscribed, status, on_grace_period, ends_at } = subscription;
  const [visible, setVisible] = useState(true);
  const daysLeft = getDaysLeft(ends_at);
  // main render
  return (
    <div className="w-full h-screen flex">
      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="w-full h-full flex flex-col justify-start overflow-y-auto">
        <NavBar setIsOpen={setIsOpen} />
        <main className="w-full relative  h-[calc(100vh-80px)] px-5 py-3 overflow-y-auto">
          {on_grace_period && daysLeft > 0 && visible && (
            <div className=" w-full absolute max-w-2xl p-3 mx-auto top-3  left-1/2 -translate-x-1/2 flex items-center justify-center gap-0 bg-yellow-100 text-yellow-800 text-center  rounded">
              ⚠️ Your subscription was canceled. You still have{" "}
              <strong>{daysLeft} days</strong> of access left.
              {/* Close button */}
              <button
                type="button"
                onClick={() => setVisible(false)}
                className=" cursor-pointer  text-yellow-800 hover:text-yellow-900"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
