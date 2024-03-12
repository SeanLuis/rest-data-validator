import { IGetter } from "../../interfaces/accessors/IGetter";

/**
 * Decorator function that automatically creates a getter for a property.
 * @param options - Optional. The options for the Getter decorator.
 * @returns A decorator function.
 */
export function Getter(options?: IGetter) {
    return function (target: any, propertyName: string) {
        const baseName = propertyName.startsWith('_') ? propertyName.slice(1) : propertyName;
        const capitalizedBaseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

        Object.defineProperty(target, `get${capitalizedBaseName}`, {
            get() { return this[propertyName]; },
            enumerable: options?.enumerable ?? true,
            configurable: true,
        });
    };
}