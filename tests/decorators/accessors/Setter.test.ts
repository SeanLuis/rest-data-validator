// @ts-nocheck

import { Setter } from '../../../src';

interface SetterMethod {
  setProp(value: string): void;
}

class TestClass {
    @Setter() private _prop: string = 'test';
}

describe('AutoSetter', () => {
    it('should create a setter for the property', () => {
        const testInstance = new TestClass() as TestClass & SetterMethod;
        expect(testInstance).toHaveProperty('setProp');

        testInstance._prop = 'new value';
        expect(testInstance._prop).toBe('new value');
    });
});