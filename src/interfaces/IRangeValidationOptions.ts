export interface RangeValidationOptions<T> {
    min?: T; // Valor mínimo permitido (puede ser número o fecha)
    max?: T; // Valor máximo permitido (puede ser número o fecha)
    inclusive?: boolean; // Si el rango es inclusivo o exclusivo
    message?: string; // Mensaje de error personalizado
    step?: number; // Para números, define un paso permitido entre valores (útil para intervalos, como "debe ser múltiplo de")
    dateFormat?: string; // Para fechas, especifica el formato de fecha esperado para validar correctamente el string de entrada
    customValidator?: (value: T) => boolean; // Validador personalizado que puede ser usado para lógica de validación compleja
    errorMessage?: { // Proporciona mensajes de error personalizados para cada tipo de validación
        min?: string;
        max?: string;
        step?: string;
        dateFormat?: string;
        customValidator?: string;
    };
}
