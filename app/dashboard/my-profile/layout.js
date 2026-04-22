import NavLink from "@/components/common/NavLink";
import PageWrapper from "@/components/dashboard/PageWrapper"

const MyProfileLayout = ({ children }) => {
    const navItems = [
        {
            path: "/dashboard/my-profile",
            name: "Update Profile",
            end: true,
        },
        {
            path: "/dashboard/my-profile/style-profile",
            name: "Style Profile",
            end: true,
        },
        {
            path: "/dashboard/my-profile/subscription",
            name: "Subscriptions",
            end: true,
        },
    ];
    // main render
    return (
        <PageWrapper className={`pt-2`}>
            <div className="flex gap-1 w-full overflow-x-auto border-b">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        href={item.path}
                        end={item.end}
                        className="px-3 py-2 text-nowrap flex items-center gap-2 text-xs  sm:text-base"
                        activeClassName="bg-primary-dark text-white"
                        inactiveClassName="text-primary-dark hover:bg-primary-dark hover:text-white"
                    >
                        <span className="text-2xl shrink-0">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>
            {children}
        </PageWrapper>
    )
}

export default MyProfileLayout