"use client"
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import MobileSideBar from "@/components/shared/MobileSideBar";
import { useState } from "react";
import { ReactLenis } from "lenis/react";
const MainLayoutClient = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    return (
        <ReactLenis root>
            <Header toggleSidebar={toggleSidebar} />
            <main className="w-full min-h-screen">
                {children}
            </main>
            {/* mobile sidebar */}
            <MobileSideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <Footer />
        </ReactLenis>
    )
}

export default MainLayoutClient