import { IFileValidationOptions } from '../interfaces/IFileValidationOptions';
import { ValidationResult } from '../types/ValidationResult';
import { IGenericFile } from "../utils/file/IGenericFile";

/**
 * The validateFile function validates a file based on provided options.
 * It checks the file's MIME type, size, extension, name, and content.
 * For MIME type validation, it checks if the file's MIME type is included in the provided list.
 * For size validation, it checks if the file's size is within the provided minimum and maximum size limits.
 * For extension validation, it checks if the file's extension is included in the allowed extensions list and not included in the disallowed extensions list.
 * For name validation, it uses a custom validation function provided in the options.
 * For content validation, it uses a custom validation function provided in the options and requires the file's content to be available as a Buffer.
 *
 * @function
 * @param {IGenericFile} file - The file to validate.
 * @param {IFileValidationOptions} options - The validation options.
 * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the file is valid and an array of error messages.
 */
export const validateFile = (
    file: IGenericFile,
    options: IFileValidationOptions = {}
): ValidationResult => {
    const errors: string[] = [];

    if (options.mimeTypes && !options.mimeTypes.includes(file.mimeType)) {
        errors.push(`Disallowed MIME type: ${file.mimeType}.`);
    }

    if (options.maxSize && file.size > options.maxSize) {
        errors.push(`File size exceeds the maximum allowed limit of ${options.maxSize} bytes.`);
    }

    if (options.minSize && file.size < options.minSize) {
        errors.push(`File size is below the minimum required limit of ${options.minSize} bytes.`);
    }

    const fileExtension = file.originalName.split('.').pop()?.toLowerCase();
    if (options.allowedExtensions && fileExtension && !options.allowedExtensions.includes(fileExtension)) {
        errors.push(`Disallowed file extension: .${fileExtension}.`);
    }

    if (options.disallowedExtensions && fileExtension && options.disallowedExtensions.includes(fileExtension)) {
        errors.push(`File extension is explicitly disallowed: .${fileExtension}.`);
    }

    if (options.validateFileName && !options.validateFileName(file.originalName)) {
        errors.push(`File name validation failed for: ${file.originalName}.`);
    }

    if (options.validateFileContent && !options.validateFileContent(file.buffer)) {
        errors.push(`File content validation failed.`);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};