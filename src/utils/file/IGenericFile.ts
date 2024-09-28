/**
 * IGenericFile interface represents a generic file structure.
 * This interface is used to handle file data throughout the application.
 *
 * @interface
 * @property {string} originalName - The original name of the uploaded file.
 * @property {number} size - The size of the file in bytes.
 * @property {string} mimeType - The MIME type of the file.
 * @property {Buffer} buffer - Optional: the content of the file as a Buffer, if necessary for content validation.
 */
export interface IGenericFile {
    originalName: string;
    size: number;
    mimeType: string;
    buffer: Buffer;
}