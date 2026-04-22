export function maskEmail(email) {
    if (!email) return "";

    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email; // No @ found

    // Keep first 2 letters, then add ****@domain.com
    return email.slice(0, 2) + "****" + email.slice(atIndex);
}
