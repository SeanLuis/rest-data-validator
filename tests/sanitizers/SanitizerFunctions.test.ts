import { trim, toLowerCase, toUpperCase, round, toNumber, floor, ceil, toBoolean, stripHtml, urlEncode, urlDecode, toDate, toInteger, toFloat, toJson } from '../../src';

describe('Sanitizers', () => {
    it('should trim a string', () => {
        expect(trim('  hello  ')).toBe('hello');
    });

    it('should convert a string to lowercase', () => {
        expect(toLowerCase('HELLO')).toBe('hello');
    });

    it('should convert a string to uppercase', () => {
        expect(toUpperCase('hello')).toBe('HELLO');
    });

    it('should round a number', () => {
        expect(round(1.5)).toBe(2);
    });

    it('should convert a string to a number', () => {
        expect(toNumber('1.5')).toBe(1.5);
    });

    it('should floor a number', () => {
        expect(floor(1.5)).toBe(1);
    });

    it('should ceil a number', () => {
        expect(ceil(1.5)).toBe(2);
    });

    it('should convert a string to a boolean', () => {
        expect(toBoolean('true')).toBe(true);
        expect(toBoolean('false')).toBe(false);
    });

    it('should strip HTML from a string', () => {
        expect(stripHtml('<p>Hello</p>')).toBe('Hello');
    });

    it('should URL encode a string', () => {
        expect(urlEncode('hello world')).toBe('hello%20world');
    });

    it('should URL decode a string', () => {
        expect(urlDecode('hello%20world')).toBe('hello world');
    });

    it('should convert a string to a date', () => {
        expect(toDate('2022-01-01')).toEqual(new Date('2022-01-01'));
        expect(toDate('invalid')).toBeNull();
    });

    it('should convert a string to an integer', () => {
        expect(toInteger('10')).toBe(10);
        expect(toInteger('invalid')).toBeNaN();
    });

    it('should convert a string to a float', () => {
        expect(toFloat('1.5')).toBe(1.5);
        expect(toFloat('invalid')).toBeNaN();
    });

    it('should convert a string to JSON', () => {
        expect(toJson('{"hello":"world"}')).toEqual({ hello: 'world' });
        expect(toJson('invalid')).toBeNull();
    });
});