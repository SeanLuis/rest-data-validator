import { ClassValidator, Domain } from "../../src";

@ClassValidator
class Website {
    @Domain({ type: 'url', mustBeSecure: true })
    domain: string;

    constructor(domain: string) {
        this.domain = domain;
    }
}

describe('Website with Domain Decorator', () => {
  it('should create an instance without throwing errors for a valid domain', () => {
      expect(() => new Website('https://example.com')).not.toThrow();
  });

  it('should throw an error for an invalid domain', () => {
      expect(() => new Website('http://example.com')).toThrow('Validation failed:');
  });
});


