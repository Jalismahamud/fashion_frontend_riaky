import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://admin.aichique.com";
const ACCESS_TOKEN_KEY = process.env.AUTH_TOKEN_NAME || "chique_auth_token";

export async function axiosPrivateServer() {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN_KEY)?.value || null;

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
                cookieStore.delete(ACCESS_TOKEN_KEY);
                redirect("/auth/sign-in"); // ✅ safe server redirect
            }
            return Promise.reject(error);
        }
    );

    return instance;
}
