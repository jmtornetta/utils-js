/**
 * Convert a date into a ISO string for the browser. Useful for HTML <input type="date" value={dateString} /> elements.
 * @param {Date} d Date
 * @returns {string} string
 */
const dateToString = (d?: Date): string => d ? new Date(d).toISOString().split("T")[0] : "";