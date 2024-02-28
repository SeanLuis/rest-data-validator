export interface IGenericFile {
    originalName: string; // Nombre original del archivo subido
    size: number; // Tamaño del archivo en bytes
    mimeType: string; // Tipo MIME del archivo
    buffer: Buffer; // Opcional: contenido del archivo como Buffer, si es necesario para validación de contenido
}