import dayjs from "dayjs";

// Optional plugins (if needed)
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const formatDateWithDay = (dateString) => {
    if (!dateString) return null;
    try {
        return dayjs(dateString).format("ddd, D MMM YYYY");
        // Example: Sat, 13 Sep 2025
    } catch {
        return dateString; // fallback
    }
};

export const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
        return dayjs(dateString).format("MMM YYYY");
        // Example: Sep 2025
    } catch {
        return dateString; // fallback
    }
};
