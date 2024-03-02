/**
 * Validates if a date in string form matches a given format.
 * This example assumes the format 'YYYY-MM-DD'.
 *
 * @param {string} dateString The date as a string to validate.
 * @returns {boolean} True if the date is valid according to the format; otherwise, false.
 */
export function isValidDate(dateString: string): boolean {
    // Regular expression to validate the format 'YYYY-MM-DD'
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(dateString)) {
        return false; // The string does not follow the format 'YYYY-MM-DD'
    }

    // Attempts to create a Date object and checks if the components match
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    // Checks if the date components are correct (months in JS are 0-indexed)
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return false; // The date is not valid (for example, February 30)
    }

    return true; // The date is valid
}