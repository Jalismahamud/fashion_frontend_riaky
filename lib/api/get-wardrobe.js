export async function getWardrobe(axiosInstance, options = {}) {
    if (!axiosInstance) return null;
    try {
        const { params = {}, headers = {} } = options;
        const response = await axiosInstance.get("/my-item-list", {
            params,
            headers,
        });
        return response.data?.data || {};
    } catch (err) {
        console.error("Failed to fetch wardrobe:", err);
        throw err;
    }
}
