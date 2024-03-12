// @ts-nocheck

import { Getter } from '../../../src';

interface GetterMethod {
  getProp(): string;
}

class TestClass {
    @Getter() private _prop: string = 'test';
}

describe('AutoGetter', () => {
    it('should create a getter for the property', () => {
        const testInstance = new TestClass() as TestClass & GetterMethod;
        expect(testInstance).toHaveProperty('getProp');
        expect(testInstance.getProp).toBeDefined();
    });
});
