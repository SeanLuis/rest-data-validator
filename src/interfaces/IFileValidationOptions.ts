/**
 * The IFileValidationOptions interface represents the options for file validation.
 * This interface is used to handle file validation throughout the application.
 *
 * @interface
 * @property {string[]} mimeTypes - Optional: The allowed MIME types for the file. If not provided, all MIME types are considered valid.
 * @property {number} maxSize - Optional: The maximum size of the file in bytes. If not provided, there is no maximum size.
 * @property {number} minSize - Optional: The minimum size of the file in bytes. Useful for ensuring the quality of files, such as images or documents. If not provided, there is no minimum size.
 * @property {string[]} allowedExtensions - Optional: The allowed file extensions. For example, ['.jpg', '.png']. If not provided, all extensions are considered valid.
 * @property {string[]} disallowedExtensions - Optional: The disallowed file extensions. If not provided, no extensions are disallowed.
 * @property {(fileName: string) => boolean} validateFileName - Optional: A custom function to validate the file name. If not provided, all file names are considered valid.
 * @property {(fileBuffer: Buffer) => boolean} validateFileContent - Optional: A custom function to validate the file content. Useful for verifying the integrity or specific content of the file. If not provided, all file contents are considered valid.
 */
export interface IFileValidationOptions {
    mimeTypes?: string[];
    maxSize?: number;
    minSize?: number;
    allowedExtensions?: string[];
    disallowedExtensions?: string[];
    validateFileName?: (fileName: string) => boolean;
    validateFileContent?: (fileBuffer: Buffer) => boolean;
}