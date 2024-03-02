/**
 * The ValidationChain type represents a function that performs a chain of validations on a value.
 * 
 * The function takes a value of any type and an array of ValidatorFunctions.
 * It applies each ValidatorFunction to the value in the order they are provided.
 * It returns a ValidationResult object.
 * 
 * @param {any} value - The value to validate.
 * @param {...ValidatorFunction<any>[]} validators - The validators to apply.
 * @returns {ValidationResult} A ValidationResult object.
 */
import { ValidationResult, ValidatorFunction } from "./ValidationResult";

export type ValidationChain = (value: any, ...validators: ValidatorFunction<any>[]) => ValidationResult;