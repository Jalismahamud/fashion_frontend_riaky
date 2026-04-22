import { useAuth } from '@/hooks/auth.hook';
import { useUser } from '@/hooks/get-user.hook';
import React from 'react'

const SignOutModal = ({ setIsModalOpen }) => {
    const { logout } = useAuth();
    const { setAccessToken } = useUser(); // 👈 to clear access token after logout
    const handleLogout = async () => {
        await logout.mutateAsync();
        setIsModalOpen(false);
        setAccessToken(null); 
    }
    // content
    return (
        <div className="w-full flex flex-col gap-4 justify-start items-center py-6">
            <p className="text-center xs:text-4xl text-2xl text-primary-dark font-semibold">
                Sign Out
            </p>
            <p className="text-center text-primary-dark xs:text-xl text-lg font-semibold">
                Do you want to log out?
            </p>
            <div className="flex justify-center gap-3">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="3xs:px-10 px-5 3xs:py-2 py-1.5 border hover:bg-primary-dark xs:text-lg text-base hover:text-white transition-all duration-300 ease-in-out border-primary text-black rounded-[100px] cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleLogout}
                    className="3xs:px-10 px-5 3xs:py-2 py-1.5 border border-primary hover:bg-primary-dark xs:text-lg text-base hover:text-white text-black transition-all duration-300 ease-in-out rounded-[100px] cursor-pointer"
                >
                    {logout.isPending ? "Logging out..." : "Log Out"}
                </button>
            </div>
        </div>
    )
}

export default SignOutModal