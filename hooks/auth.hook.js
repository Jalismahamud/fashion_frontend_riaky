import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useUser } from "./get-user.hook";
import { useRouter } from "next/navigation";
import axiosPublic from "@/lib/axios.public";

// ------------------- // Constants from env // -------------------
const ACCESS_TOKEN_KEY = process.env.AUTH_TOKEN_NAME || "chique_auth_token";
const VERIFY_EMAIL_KEY = process.env.NEXT_PUBLIC_VERIFY_EMAIL_KEY || "verifyEmail";
const VERIFY_OTP_KEY = process.env.NEXT_PUBLIC_VERIFY_OTP_KEY || "verifyOtp";
const RESET_EMAIL_KEY = process.env.NEXT_PUBLIC_RESET_EMAIL_KEY || "resetEmail";
const RESET_OTP_KEY = process.env.NEXT_PUBLIC_RESET_OTP_KEY || "resetOtp";
const RESET_TOKEN_KEY = process.env.NEXT_PUBLIC_RESET_TOKEN_KEY || "resetToken";

export const useAuth = () => {
    const { setAccessToken, userRefetch } = useUser();
    const queryClient = useQueryClient();
    const router = useRouter();
    const axiosInstance = axiosPublic();
    // console.log("From auth hook:", userData);
    // ------------------- // Set auth cookie // -------------------
    const setAuthCookie = (token, expiresInMinutes) => {
        Cookies.set(ACCESS_TOKEN_KEY, token, {
            expires: expiresInMinutes / (60 * 24),
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
    };
    // ------------------- // Task after login // -------------------
    const onLogin = (token, expires_in_minutes, isQuizAnswered) => {
        setAuthCookie(token, expires_in_minutes);
        setAccessToken(token);
        if (isQuizAnswered) {
            router.push("/dashboard");
        } else {
            router.push("/quiz");
        }
    };

    // ------------------- // Task after logout // -------------------
    const onLogout = () => {
        Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
        router.push("/auth/sign-in");
    };
    // ------------------- // Register mutation // -------------------
    const register = useMutation({
        mutationKey: ["register"],
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/register", data);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Otp sent successfully");
            sessionStorage.setItem(VERIFY_EMAIL_KEY, data?.data?.email);
            sessionStorage.setItem(VERIFY_OTP_KEY, data?.data?.otp);
            router.push("/auth/user-verification");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Registration failed");
        },
    });
    // ------------------- // Login mutation // -------------------
    const login = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/login", data);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Logged in successfully");
            // get necessary data from response 
            const isQuizAnswered = data?.data?.is_style_profile;
            const token = data?.data?.chique_auth_token;
            const expiresInMinutes = data?.data?.expires_in_minutes;
            // pass data to onLogin function
            onLogin(token, expiresInMinutes, isQuizAnswered);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Login failed");
        },
    });
    // ------------------- // Apple login mutation // ------------------- 
    const appleMutation = useMutation({
        mutationFn: async (token) => {
            const response = await axiosInstance.post("/apple-authentication", { token });
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Apple login successful");
            const isQuizAnswered = data?.data?.is_style_profile;
            const token = data?.data?.chique_auth_token;
            const expiresInMinutes = data?.data?.expires_in_minutes;
            onLogin(token, expiresInMinutes, isQuizAnswered);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Something went wrong!");
        },
    });

    // ------------------- // Google login mutation // ------------------- 
    const googleMutation = useMutation({
        mutationFn: async (token) => {
            const response = await axiosInstance.post("/google-authentication", { token });
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Google login successful");
            const isQuizAnswered = data?.data?.is_style_profile;
            const token = data?.data?.chique_auth_token;
            const expiresInMinutes = data?.data?.expires_in_minutes;
            onLogin(token, expiresInMinutes, isQuizAnswered);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Something went wrong!");
        },
    });

    // ------------------- // Verify registered user mutation // -------------------
    const verifyOtp = useMutation({
        mutationKey: ["verifyOtp"],
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/register-otp-verify", data);
            return response.data;
        },
        onSuccess: (data) => {
            setAuthCookie(data?.data?.chique_auth_token, data?.data?.expires_in_minutes);
            setAccessToken(data?.data?.chique_auth_token);
            sessionStorage.removeItem(VERIFY_EMAIL_KEY);
            sessionStorage.removeItem(VERIFY_OTP_KEY);
            toast.success(data?.message || "User Verified successfully");
            router.push("/welcome");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "OTP verification failed");
        },
    });

    // ------------------- // Forgot password mutation // -------------------
    const forgotPassword = useMutation({
        mutationKey: ["forgotPassword"],
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/forgot-password", data);
            return response.data;
        },
        onSuccess: (response, variables) => {
            toast.success(response?.message || "Otp sent successfully");
            sessionStorage.setItem(RESET_EMAIL_KEY, variables?.email);
            //   sessionStorage.setItem(RESET_OTP_KEY, response?.data?.otp);
            router.push("/auth/reset-verification");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to send otp");
        },
    });

    // ------------------- // Resend OTP mutation // -------------------
    const resendOtp = useMutation({
        mutationKey: ["resendOtp"],
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/resend-otp", data);
            return response.data;
        },
        onSuccess: (res) => {
            toast.success(res?.message || "OTP resent successfully");
            // sessionStorage.setItem(RESET_OTP_KEY, res?.data?.otp);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Something went wrong!");
        },
    });

    // ------------------- // Verify reset OTP mutation // -------------------
    const verifyResetOtp = useMutation({
        mutationKey: ["verifyResetOtp"],
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/verify-otp", data);
            return response.data;
        },
        onSuccess: (res) => {
            toast.success(res?.message || "OTP verified successfully");
            sessionStorage.setItem(RESET_TOKEN_KEY, res?.token);
            sessionStorage.removeItem(RESET_OTP_KEY);
            router.push("/auth/create-new-password");
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Something went wrong!");
        },
    });

    // ------------------- // Reset new password mutation // -------------------
    const resetNewPassword = useMutation({
        mutationKey: ["resetNewPassword"],
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/reset-password", data);
            return response.data;
        },
        onSuccess: (res) => {
            toast.success(res?.message || "Password reset successfully");
            sessionStorage.removeItem(RESET_TOKEN_KEY);
            sessionStorage.removeItem(RESET_EMAIL_KEY);
            router.push("/auth/sign-in");
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Something went wrong!");
            sessionStorage.removeItem(RESET_TOKEN_KEY);
            sessionStorage.removeItem(RESET_EMAIL_KEY);
            router.push("/auth/sign-in");
        },
    });

    // ------------------- // Logout mutation // -------------------
    const logout = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            try {
                const token = Cookies.get(ACCESS_TOKEN_KEY);
                const response = await axiosInstance.post(
                    "/logout",
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                return response?.data;
            } catch (error) {
                console.error("Logout API error:", error);
                return null;
            }
        },
        onSuccess: (response) => {
            toast.success(response?.message || "Logged out successfully");
            onLogout();
        },
        onError: () => {
            onLogout();
            toast.success("Logged out successfully");
        },
        onSettled: () => {
            queryClient.clear();
            onLogout();
        },
    });

    // ------------------- // Return all auth hooks // -------------------
    return {
        login,
        googleMutation,
        appleMutation,
        register,
        verifyOtp,
        forgotPassword,
        resendOtp,
        verifyResetOtp,
        resetNewPassword,
        logout,
        onLogout,
        setAuthCookie,
    };
};
