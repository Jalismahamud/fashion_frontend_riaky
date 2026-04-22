
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://admin.aichique.com";

export function axiosPublic () {
    const instance = axios.create({
        baseURL: `${baseURL}/api`,
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        },
    });
    return instance;
}
export default axiosPublic;