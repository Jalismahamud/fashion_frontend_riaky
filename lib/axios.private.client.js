/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://admin.aichique.com";
const ACCESS_TOKEN_KEY = process.env.AUTH_TOKEN_NAME || "chique_auth_token";

export function axiosPrivateClient () {
    const router = useRouter();
    const token = Cookies.get(ACCESS_TOKEN_KEY) || null;
    const instance = axios.create({
        baseURL: `${baseURL}/api`,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    instance.interceptors.response.use(
        (res) => res,
        (error) => {
            if (error.response?.status === 401) {
                Cookies.remove(ACCESS_TOKEN_KEY);
                router.push("/auth/sign-in"); // ✅ safe client redirect
            }
            return Promise.reject(error);
        }
    );

    return instance;
}
