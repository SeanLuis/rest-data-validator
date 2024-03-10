import { IEmailValidationOptions } from '../interfaces/IEmailValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

/**
 * The validateEmail function validates an email based on provided options or a default pattern.
 * 
 * It checks if the email matches the provided regular expression pattern or a default one.
 * 
 * @function
 * @param {string} email - The email to validate.
 * @param {IEmailValidationOptions} options - The validation options including a custom regex pattern and a custom error message.
 * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the email is valid and an array of error messages.
 */
export const validateEmail = (email: string, options: IEmailValidationOptions = {}): ValidationResult => {
    // Define the default email regex pattern.
    const emailRegex = /^[a-zA-Z0-9_'^&/+-]{1,64}(?:\.[a-zA-Z0-9_'^&/+-]{1,64})*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,24}$/;

    const errors: string[] = [];
    let regexPattern = emailRegex;

    // Validate and use the custom regex pattern if provided and valid; otherwise, use the default.
    try {
        if (options.regexPattern) {
            new RegExp(options.regexPattern);
            regexPattern = options.regexPattern;
        }
    } catch (e) {
        console.warn('Provided regex pattern is invalid. Using the default pattern.');
    }
    let regRes = regexPattern.test(email)
    if (!regRes) {
        let errorMessage = 'Email does not match the required pattern.';
        if (options.message) {
            errorMessage += ` ${options.message}`;
        }
        errors.push(errorMessage);
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};
