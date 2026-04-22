export async function getReviews(axiosInstance, options = {}) {
    if (!axiosInstance) return null;
    try {
        const { params = {}, headers = {} } = options;
        const res = await axiosInstance.get("/reviews", {
            params,
            headers,
        });
        return res.data?.data || {};
    } catch (err) {
        console.error("Failed to fetch reviews:", err);
        throw err;
    }
}
