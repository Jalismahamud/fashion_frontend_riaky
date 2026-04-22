// utils/subscription.js

/**
 * Calculate remaining days until subscription ends
 * @param {string | null} endsAt - ISO date string (e.g. "2025-10-23T06:31:06.000000Z")
 * @returns {number} days left (0 if expired or invalid)
 */
export function getDaysLeft(endsAt) {
    if (!endsAt) return 0;

    const now = new Date().getTime();
    const end = new Date(endsAt).getTime();

    if (isNaN(end)) return 0;

    return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
}
