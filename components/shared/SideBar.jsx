"use client";
import { RxCross2 } from "react-icons/rx";
import DashboardLogo from "../common/DashboardLogo";
import { useState } from "react";
import { Modal } from "antd";
import SideBarItems from "./SideBarItems";
import SignOutModal from "./SignOutModal";

const SideBar = ({ isOpen = false, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // side bar component
  return (
    <aside
      className={`
        w-64 flex bg-[#FAFAFB] flex-col justify-start xl:static fixed overflow-y-auto shrink-0 transition-all duration-500 ease-in-out
        ${isOpen ? " xl:-ml-64 translate-x-0" : " xl:ml-0 -translate-x-full"}
        xl:translate-x-0 z-[500]
      `}
    >
      {/* LOGO */}
      <div className="w-full h-20 shrink-0  sticky top-0 flex justify-start items-center border-b overflow-hidden border-b-primary-dark">
        <DashboardLogo className="w-full h-full justify-center" />
        <button
          onClick={onClose}
          className="xl:hidden text-primary-dark -ml-10"
        >
          <RxCross2 className="text-3xl" />
        </button>
      </div>
      {/* NAV ITEMS */}
      <SideBarItems setIsModalOpen={setIsModalOpen} />
      {/* Logout Confirmation Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        className="bg-white rounded-lg"
      >
        <SignOutModal setIsModalOpen={setIsModalOpen} />
      </Modal>
    </aside>
  );
};

export default SideBar;
