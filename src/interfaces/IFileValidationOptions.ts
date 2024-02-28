export interface IFileValidationOptions {
    mimeTypes?: string[]; // Tipos MIME permitidos
    maxSize?: number; // Tamaño máximo del archivo en bytes
    minSize?: number; // Tamaño mínimo del archivo en bytes (útil para asegurar la calidad de los archivos, como imágenes o documentos)
    allowedExtensions?: string[]; // Extensiones de archivo permitidas (por ejemplo, ['.jpg', '.png'])
    disallowedExtensions?: string[]; // Extensiones de archivo no permitidas
    validateFileName?: (fileName: string) => boolean; // Función personalizada para validar el nombre del archivo
    validateFileContent?: (fileBuffer: Buffer) => boolean; // Función personalizada para validar el contenido del archivo, útil para verificar la integridad o el contenido específico del archivo
}
