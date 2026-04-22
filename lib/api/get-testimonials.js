export async function getTestimonials(axiosInstance) {
    if (!axiosInstance) return null;
    try {
        const res = await axiosInstance.get("/home/reviews");
        return res.data?.data || [];
    } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        throw err;
    }
}
