import { IFileValidationOptions } from '../interfaces/IFileValidationOptions';
import { ValidationResult } from '../types/ValidationResult';
import { IGenericFile } from "../utils/file/IGenericFile";

export const validateFile = (
    file: IGenericFile, // Usar el tipo genérico de archivo en lugar de Express.Multer.File
    options: IFileValidationOptions = {}
): ValidationResult => {
    const errors: string[] = [];

    // Validar tipo MIME
    if (options.mimeTypes && !options.mimeTypes.includes(file.mimeType)) {
        errors.push(`Disallowed MIME type: ${file.mimeType}.`);
    }

    // Validar tamaño máximo
    if (options.maxSize && file.size > options.maxSize) {
        errors.push(`File size exceeds the maximum allowed limit of ${options.maxSize} bytes.`);
    }

    // Validar tamaño mínimo
    if (options.minSize && file.size < options.minSize) {
        errors.push(`File size is below the minimum required limit of ${options.minSize} bytes.`);
    }

    // Validar extensiones permitidas
    const fileExtension = file.originalName.split('.').pop()?.toLowerCase();
    if (options.allowedExtensions && fileExtension && !options.allowedExtensions.includes(fileExtension)) {
        errors.push(`Disallowed file extension: .${fileExtension}.`);
    }

    // Validar extensiones no permitidas
    if (options.disallowedExtensions && fileExtension && options.disallowedExtensions.includes(fileExtension)) {
        errors.push(`File extension is explicitly disallowed: .${fileExtension}.`);
    }

    // Validación personalizada del nombre del archivo
    if (options.validateFileName && !options.validateFileName(file.originalName)) {
        errors.push(`File name validation failed for: ${file.originalName}.`);
    }

    // Validación personalizada del contenido del archivo
    // Nota: Esto requeriría que el contenido del archivo esté disponible como un Buffer
    if (options.validateFileContent && !options.validateFileContent(file.buffer)) {
        errors.push(`File content validation failed.`);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};
