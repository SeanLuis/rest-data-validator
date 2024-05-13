import "reflect-metadata";
import { IPasswordValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating password properties.
 * @param options - The options for password validation.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply password validation to a property.
 */
export function Password(options: IPasswordValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'password', options, groups });
    };
}