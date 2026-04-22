"use client"

import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Logo from "../common/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  // social links
  const socialLinks = [
    {
      id: 1,
      icon: <FaInstagram className="sm:text-3xl text-2xl" />,
      link: "https://www.instagram.com/chique_ai?igsh=MTA0bXJ1aHI0bGY2MA==",
    },
    {
      id: 2,
      icon: <FaTwitter className="sm:text-3xl text-2xl" />,
      link: "https://x.com/Chique_ai?t=",
    },
    {
      id: 3,
      icon: <FaTiktok className="sm:text-3xl text-2xl" />,
      link: "https://www.tiktok.com/@chique.ai?_t=ZS-902y67cXOye&_r=1",
    },
    {
      id: 4,
      icon: <FaFacebookSquare className="sm:text-3xl text-2xl" />,
      link: "https://www.facebook.com/share/14H1fDDNUFz/",
    },
  ];
  // items
  const items = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Subscription", path: "/#subscriptions" },
    { name: "Contact", path: "/contact" },
  ];

  // main ui component
  return (
    <footer className="w-full lg:py-10 py-6">
      <div className="container flex flex-col xl:gap-10 lg:gap-8 md:gap-6 gap-4 justify-start">
        {/* lgoo & copy right wrapper*/}
        <div className="w-full flex xs:flex-row flex-col sm:gap-6 xs:gap-2 gap-4 justify-between xs:items-center">
          {/* lgoo & copy right */}
          <div className="flex flex-col text-lg md:gap-4 gap-1 xs:justify-start justify-center items-start">
            <Logo />
            <p className="text-base sm:text-xl">
              {" "}
              © {currentYear} Chique AI. All rights reserved.
            </p>
          </div>
          {/* social links */}
          <div className="w-fit grid grid-cols-4 shrink-0 gap-3">
            {socialLinks.map((social) => (
              <a
                href={social.link}
                key={social.id}
                target="_blank"
                className="sm:w-[30px] w-6 sm:h-[30px] h-6 overflow-hidden"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <hr className="w-full border border-[#0D0E10]" />
      </div>
      {/* footer items */}
      <div className="w-full flex xs:gap-3 gap-1.5 justify-center items-center xl:pt-10 lg:pt-8 md:pt-6 pt-4">
        {items.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`relative py-1 !font-secondary `}
          >
            {item.name}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-primary-dark transition-all duration-300 ${
                pathname === item.path ? "w-full" : "w-0"
              }`}
            />
          </Link>
        ))}
      </div>
    </footer>
  );
};
export default Footer;
