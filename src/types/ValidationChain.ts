import { IChainValidationOptions } from "../interfaces/IChainValidationOptions";
import { IValidationResult } from "../interfaces";

/**
 * Represents a validation chain function.
 * @param value - The value to be validated.
 * @param options - The options for the validation chain.
 * @returns The result of the validation.
 */
export type ValidationChain = (value: any, options: IChainValidationOptions) => IValidationResult;