"use client";
import { useUser } from "@/hooks/get-user.hook";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const { isLoggedIn } = useUser();
  const pathname = usePathname();
  let navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Subscription", path: "/#subscriptions" },
    { name: "Contact", path: "/contact" },
  ];
  if (isLoggedIn) {
    navItems = [...navItems, { name: "Dashboard", path: "/dashboard" }];
  }
  return (
    <nav className="lg:flex hidden justify-between items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          prefetch={true}
          className={`relative py-1 !font-secondary `}
        >
          {item.name}
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-primary-dark transition-all duration-300 ${pathname === item.path ? "w-full" : "w-0"
              }`}
          />
        </Link>
      ))}
    </nav>
  );
};
export default NavItems;