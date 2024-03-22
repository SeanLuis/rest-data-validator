import { IFileValidationOptions, IValidationResult } from '../interfaces';
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
 * @returns {IValidationResult} A IValidationResult object that contains a boolean indicating if the file is valid and an array of error messages.
 */
export const validateFile = (
    file: IGenericFile,
    options: IFileValidationOptions = {}
): IValidationResult => {
    const errors: string[] = [];

    const addError = (defaultMessage: string, customMessage?: string) => {
        errors.push(customMessage || defaultMessage);
    };

    if (options.mimeTypes && !options.mimeTypes.includes(file.mimeType)) {
        addError(`Disallowed MIME type: ${file.mimeType}.`, options.message);
    }

    if (options.maxSize && file.size > options.maxSize) {
        addError(`File size exceeds the maximum allowed limit of ${options.maxSize} bytes.`, options.message);
    }

    if (options.minSize && file.size < options.minSize) {
        addError(`File size is below the minimum required limit of ${options.minSize} bytes.`, options.message);
    }

    const fileExtension = file.originalName.split('.').pop()?.toLowerCase();
    if (options.allowedExtensions && fileExtension && !options.allowedExtensions.includes(fileExtension)) {
        addError(`Disallowed file extension: .${fileExtension}.`, options.message);
    }

    if (options.disallowedExtensions && fileExtension && options.disallowedExtensions.includes(fileExtension)) {
        addError(`File extension is explicitly disallowed: .${fileExtension}.`, options.message);
    }

    if (options.validateFileName && !options.validateFileName(file.originalName)) {
        addError(`File name validation failed for: ${file.originalName}.`, options.message);
    }

    if (options.validateFileContent && !options.validateFileContent(file.buffer)) {
        addError(`File content validation failed.`, options.message);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};