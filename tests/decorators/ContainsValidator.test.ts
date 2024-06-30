import { ClassValidator, Contains } from "../../src";

@ClassValidator
class Article {
    @Contains({ seed: 'keyword', message: 'Content does not contain the keyword' })
    content: string;

    constructor(content: string) {
        this.content = content;
    }
}

describe('Article with Contains Decorator', () => {
    it('should create an instance without throwing errors for valid content containing the keyword', () => {
        expect(() => new Article('This content contains the keyword')).not.toThrow();
    });

    it('should throw an error for content not containing the keyword', () => {
        expect(() => new Article('This content does not contain it')).toThrow('Validation failed: Content does not contain the keyword');
    });

    it('should be case sensitive by default', () => {
        expect(() => new Article('This content contains the Keyword')).toThrow('Validation failed: Content does not contain the keyword');
    });

    it('should respect the ignoreCase option', () => {
        @ClassValidator
        class CaseInsensitiveArticle {
            @Contains({ seed: 'keyword', ignoreCase: true, message: 'Content does not contain the keyword' })
            content: string;

            constructor(content: string) {
                this.content = content;
            }
        }

        expect(() => new CaseInsensitiveArticle('This content contains the Keyword')).not.toThrow();
    });

    it('should respect the minOccurrences option', () => {
        @ClassValidator
        class MinOccurrencesArticle {
            @Contains({ seed: 'keyword', minOccurrences: 2, message: 'Content does not contain the keyword enough times' })
            content: string;

            constructor(content: string) {
                this.content = content;
            }
        }

        expect(() => new MinOccurrencesArticle('This content contains the keyword keyword')).not.toThrow();
        expect(() => new MinOccurrencesArticle('This content contains the keyword')).toThrow('Validation failed: Content does not contain the keyword enough times');
    });

    it('should handle long content with multiple occurrences of the keyword', () => {
        const longContent = 'This content contains keyword multiple times. keyword keyword keyword';
        expect(() => new Article(longContent)).not.toThrow();
    });

    it('should handle content with special characters', () => {
        @ClassValidator
        class SpecialCharacterArticle {
            @Contains({ seed: 'special!', minOccurrences: 3, message: 'Content does not contain the keyword enough times' })
            content: string;

            constructor(content: string) {
                this.content = content;
            }
        }

        const specialContent = 'This special! content contains special! characters like special! marks';
        expect(() => new SpecialCharacterArticle(specialContent)).not.toThrow();
    });

    it('should use the default error message if none is provided', () => {
        @ClassValidator
        class DefaultMessageArticle {
            @Contains({ seed: 'keyword' })
            content: string;

            constructor(content: string) {
                this.content = content;
            }
        }

        expect(() => new DefaultMessageArticle('This content does not contain it')).toThrow('Validation failed: String does not contain the seed \'keyword\' at least 1 times.');
    });
});
