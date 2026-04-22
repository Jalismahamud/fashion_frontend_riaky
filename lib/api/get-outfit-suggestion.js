export async function getOutfitSuggestion(axiosInstance, options = {}) {
    if (!axiosInstance) return null;
    try {
        const { params = {}, headers = {} } = options;
        const response = await axiosInstance.get("/weather-based-suggestion", {
            params,
            headers,
        });
        return response.data?.data || {};
    } catch (err) {
        console.error("Failed to fetch outfit suggestion:", err);
        throw err;
    }
}
