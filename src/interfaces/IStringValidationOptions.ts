export interface IStringValidationOptions {
    minLength?: number; // Longitud mínima de la cadena
    maxLength?: number; // Longitud máxima de la cadena
    regexPattern?: RegExp; // Patrón de expresión regular para validar la cadena
}
