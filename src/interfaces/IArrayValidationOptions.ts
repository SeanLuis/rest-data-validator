import { ValidatorFunction } from "../types/ValidationResult";

export interface IArrayValidationOptions<T> {
    minLength?: number; // Longitud mínima del array
    maxLength?: number; // Longitud máxima del array
    unique?: boolean; // Si todos los elementos deben ser únicos
    validator?: ValidatorFunction<T>; // Función de validación para aplicar a cada elemento
}