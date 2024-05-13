import "reflect-metadata";
import { IEmailValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating email properties.
 * @param options - The options for email validation.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply email validation to a property.
 */
export function Email(options?: IEmailValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'email', options, groups });
    };
}