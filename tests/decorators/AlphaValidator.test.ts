import { ClassValidator, Alpha } from "../../src";

@ClassValidator
class Person {
    @Alpha({ locale: 'en-US', message: 'Name should contain only letters' })
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

describe('Person with Alpha Decorator', () => {
    it('should create an instance without throwing errors for valid name', () => {
        expect(() => new Person('JohnDoe')).not.toThrow();
    });

    it('should throw an error for name containing non-letter characters', () => {
        expect(() => new Person('John123')).toThrow('Validation failed: Name should contain only letters');
    });

    it('should be locale-sensitive', () => {
        @ClassValidator
        class GermanPerson {
            @Alpha({ locale: 'de-DE', message: 'Name should contain only letters' })
            name: string;

            constructor(name: string) {
                this.name = name;
            }
        }

        expect(() => new GermanPerson('ÄÖÜß')).not.toThrow();
    });

    it('should respect the ignore option (string)', () => {
        @ClassValidator
        class PersonWithHyphen {
            @Alpha({ locale: 'en-US', ignore: '-', message: 'Name should contain only letters' })
            name: string;

            constructor(name: string) {
                this.name = name;
            }
        }

        expect(() => new PersonWithHyphen('John-Doe')).not.toThrow();
    });

    it('should respect the ignore option (RegExp)', () => {
        @ClassValidator
        class PersonWithHyphen {
            @Alpha({ locale: 'en-US', ignore: /-/g, message: 'Name should contain only letters' })
            name: string;

            constructor(name: string) {
                this.name = name;
            }
        }

        expect(() => new PersonWithHyphen('John-Doe')).not.toThrow();
    });

    it('should handle strings with spaces when ignored', () => {
        @ClassValidator
        class PersonWithSpace {
            @Alpha({ locale: 'en-US', ignore: ' ', message: 'Name should contain only letters' })
            name: string;

            constructor(name: string) {
                this.name = name;
            }
        }

        expect(() => new PersonWithSpace('John Doe')).not.toThrow();
    });

    it('should use the default error message if none is provided', () => {
        @ClassValidator
        class PersonWithDefaultMessage {
            @Alpha({ locale: 'en-US' })
            name: string;

            constructor(name: string) {
                this.name = name;
            }
        }

        expect(() => new PersonWithDefaultMessage('John123')).toThrow('Validation failed: String contains invalid characters for locale \'en-US\'.');
    });
});
