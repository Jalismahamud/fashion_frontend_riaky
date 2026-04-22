export async function getUserProfile(axiosInstance = null) {
    if (!axiosInstance) return null;
    try {
        const response = await axiosInstance.get("/profile");
        return response?.data?.data || null;
    } catch (err) {
        console.error("Failed to fetch user profile:", err);
        throw err;
    }
}
