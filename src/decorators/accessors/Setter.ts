import { ISetter } from "../../interfaces/accessors/ISetter";

/**
 * Decorator function that automatically creates a setter for a property.
 * @param options - Optional. The options for the Setter decorator.
 * @returns A decorator function.
 */
export function Setter(options?: ISetter) {
    return function (target: any, propertyName: string) {
        const baseName = propertyName.startsWith('_') ? propertyName.slice(1) : propertyName;
        const capitalizedBaseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

        Object.defineProperty(target, `set${capitalizedBaseName}`, {
            set(newValue) { this[propertyName] = newValue; },
            enumerable: options?.writable ?? true,
            configurable: true,
        });
    };
}
