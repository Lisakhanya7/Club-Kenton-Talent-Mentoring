// ===========================
// DATE UTILITY FUNCTIONS
// ===========================

/**
 * Get day from date
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {number} Day of month
 */
function getDateDay(dateString) {
    return new Date(dateString).getDate();
}

/**
 * Get month from date
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Month abbreviation (Jan, Feb, etc.)
 */
function getMonth(dateString) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[new Date(dateString).getMonth()];
}

/**
 * Format date to readable format
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date (e.g., "18 Feb")
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()} ${getMonth(dateString)}`;
}

/**
 * Format time to readable format
 * @param {string} timeString - Time in HH:MM format
 * @returns {string} Formatted time (e.g., "3:00 PM")
 */
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}
