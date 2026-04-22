export async function getWardrobeItems(axiosInstance, options = {}, slug) {
    if (!axiosInstance) return null;
    try {
        const { params = {}, headers = {} } = options;
        const response = await axiosInstance.get(`/my-item-list-details/${slug}`, {
            params,
            headers,
        });
        return response.data?.data || {};
    } catch (err) {
        console.error("Failed to fetch wardrobe items:", err);
        throw err;
    }
}
