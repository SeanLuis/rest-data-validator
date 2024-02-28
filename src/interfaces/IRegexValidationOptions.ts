export interface RegexValidationOptions {
    pattern: RegExp;               // Patrón de expresión regular para la validación
    flags?: string;                // Banderas opcionales para la expresión regular
    message?: string;              // Mensaje de error personalizado
    invertMatch?: boolean;         // Invierte el criterio de coincidencia: valida que NO coincida con el patrón
    testAgainstTrimmedValue?: boolean; // Prueba la expresión regular contra el valor recortado
    allowEmptyString?: boolean;    // Permite una cadena vacía como válida independientemente del patrón
}
