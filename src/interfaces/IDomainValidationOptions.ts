export interface IDomainValidationOptions {
    type: 'uuid' | 'url' | 'isoCountryCode' | 'isoLanguageCode';
    isoCountryCodes?: string[]; // Lista de códigos de país ISO proporcionada por el usuario
    isoLanguageCodes?: string[]; // Lista de códigos de idioma ISO proporcionada por el usuario
    isoCountryCodePath?: string; // Ruta a un archivo JSON que contiene códigos de país ISO
    isoLanguageCodePath?: string; // Ruta a un archivo JSON que contiene códigos de idioma ISO
    jsonProperty?: string; // La propiedad del JSON a verificar
}
