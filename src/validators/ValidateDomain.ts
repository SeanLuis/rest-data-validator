import { IDomainValidationOptions } from '../interfaces/IDomainValidationOptions';
import { ValidationResult } from '../types/ValidationResult';
import { readFileSync } from 'fs';

// RegEx patterns for UUID and URL validation
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * - Esquema opcional (http o https)
 * - Subdominios y dominio, que pueden incluir letras, números y guiones.
 * - TLD (Top-Level Domain), como .com, .org, que debe ser de al menos dos caracteres.
 * - Puerto opcional, como :80, :443.
 * - Ruta opcional, que puede incluir varios segmentos separados por barras.
 * - Cadena de consulta opcional, comenzando con ? y separada por &.
 * - Ancla opcional, precedida por #.
 */
const URL_REGEX = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

export const validateDomain = (
    value: string,
    options: IDomainValidationOptions
): ValidationResult => {
    const errors: string[] = [];

    // Función auxiliar para cargar y verificar códigos de un archivo JSON
    const verifyCodeFromJson = (path: string, property: string, code: string): boolean => {
        try {
            const rawData = readFileSync(path);
            const jsonData = JSON.parse(rawData.toString());
            const codes = jsonData[property];
            if (!Array.isArray(codes)) {
                throw new Error(`The property '${property}' is not an array.`);
            }
            return codes.includes(code);
        } catch (error) {
            throw new Error(`Error reading or parsing JSON from '${path}': ${error}`);
        }
    };

    if (options.type === 'url') {
        const isValidUrl = URL_REGEX.test(value);
        const isSecure = value.startsWith('https://');

        if (!isValidUrl) {
            errors.push('Value is not a valid URL.');
        } else if (options.mustBeSecure && !isSecure) {
            errors.push('URL must be secure (https).');
        }
    }

    switch (options.type) {
        case 'uuid':
            if (!UUID_REGEX.test(value)) {
                errors.push('Value is not a valid UUID.');
            }
            break;
        case 'url':
            if (!URL_REGEX.test(value)) {
                errors.push('Value is not a valid URL.');
            }
            break;
        case 'isoCountryCode':
            const isValidCountryCode = options.isoCountryCodes?.includes(value) ||
                (options.isoCountryCodePath ? verifyCodeFromJson(options.isoCountryCodePath, options.jsonProperty || 'isoCountryCodes', value) : false);

            if (!isValidCountryCode) {
                errors.push('Value is not a valid ISO country code.');
            }
            break;

        case 'isoLanguageCode':
            const isValidLanguageCode = options.isoLanguageCodes?.includes(value) ||
                (options.isoLanguageCodePath ? verifyCodeFromJson(options.isoLanguageCodePath, options.jsonProperty || 'isoLanguageCodes', value) : false);

            if (!isValidLanguageCode) {
                errors.push('Value is not a valid ISO language code.');
            }
            break;
        default:
            errors.push('Invalid validation type specified.');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};