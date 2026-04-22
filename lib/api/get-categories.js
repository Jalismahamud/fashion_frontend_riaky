export async function getCategories(axiosInstance) {
    if (!axiosInstance) return null;
    try {
        const res = await axiosInstance.get("/categories");
        return res.data?.data || [];
    } catch (err) {
        console.error("Failed to fetch categories:", err);
        throw err;
    }
}
