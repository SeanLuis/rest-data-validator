// @ts-nocheck

import { Accessors } from '../../../src';

interface AccessorsMethods {
    getProp(): string;
    setProp(value: string): void;
}

@Accessors({ includePrivate: true })
class TestClass {
    private _prop: string = 'test';

    constructor(prop: string) {
        this._prop = prop;
    }
}

describe('AutoAccessors', () => {
    it('should create a setter for the property', () => {
        const testInstance = new TestClass('initial') as TestClass & AccessorsMethods;

        expect(testInstance).toHaveProperty('setProp');
        expect(testInstance).toHaveProperty('getProp');
        expect(testInstance.getProp).toBeDefined();

        testInstance. _prop = 'new value';
        expect(testInstance._prop).toBe('new value');
    });
});

