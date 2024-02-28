export interface INumberValidationOptions {
    min?: number; // Valor mínimo permitido
    max?: number; // Valor máximo permitido
    integerOnly?: boolean; // Si solo se permiten números enteros
    positiveOnly?: boolean; // Si solo se permiten números positivos
    negativeOnly?: boolean; // Si solo se permiten números negativos
    precision?: number; // Número máximo de dígitos después del decimal
    divisibleBy?: number; // Si el número debe ser divisible por un valor específico
    notEqualTo?: number[]; // Lista de valores que el número no debe igualar
    equalTo?: number[]; // Lista de valores permitidos específicamente
}
