import { IAccessors } from "../../interfaces/accessors/IAccessors";

/**
 * Decorator function that automatically creates getters and setters for properties.
 * @param options - Optional. The options for the Accessors decorator.
 * @returns A decorator function.
 */
export function Accessors(options?: IAccessors) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        const instance = new constructor();

        const instanceProperties = Object.getOwnPropertyNames(instance);

        instanceProperties.forEach(propertyName => {
            if (propertyName === 'constructor' || (!options?.includePrivate && propertyName.startsWith('_'))) {
                return;
            }

            const baseName = propertyName.startsWith('_') ? propertyName.slice(1) : propertyName;
            const capitalizedBaseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

            const getterName = `get${capitalizedBaseName}`;
            if (typeof constructor.prototype[getterName] === 'undefined') {
                Object.defineProperty(constructor.prototype, getterName, {
                    get() { return this[propertyName]; },
                    enumerable: options?.enumerable ?? false,
                    configurable: true,
                });
            }

            const setterName = `set${capitalizedBaseName}`;
            if (typeof constructor.prototype[setterName] === 'undefined') {
                Object.defineProperty(constructor.prototype, setterName, {
                    set(newValue) { this[propertyName] = newValue; },
                    enumerable: options?.enumerable ?? false,
                    configurable: true,
                });
            }
        });
    };
}
