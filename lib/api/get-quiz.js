export async function getQuiz(axiosInstance) {
    if (!axiosInstance) return null;
    try {
        const res = await axiosInstance.get("/style-quiz/questions");
        return res.data?.data || [];
    } catch (err) {
        console.error("Failed to fetch quiz:", err);
        throw err;
    }
}
