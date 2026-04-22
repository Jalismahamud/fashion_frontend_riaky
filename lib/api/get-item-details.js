export async function getWardrobeItemDetails(axiosInstance, options = {}, slug) {
    if (!axiosInstance) return null;
    try {
        const { params = {}, headers = {} } = options;
        const response = await axiosInstance.get(`/item/details/${slug}`, {
            params,
            headers,
        });
        return response.data?.data || {};
    } catch (err) {
        console.error("Failed to fetch item details:", err);
        throw err;
    }
}
