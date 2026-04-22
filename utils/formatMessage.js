import { marked } from "marked";
import DOMPurify from "dompurify";

export const formatMessage = (text) => {
    const html = marked.parse(text || "");
    return DOMPurify.sanitize(html);
};