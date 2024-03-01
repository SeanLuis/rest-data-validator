import { ClassValidator, Range } from "../../src";

@ClassValidator
class Event {
    @Range<Date>({
      min: new Date('2023-01-01'),
      max: new Date('2023-12-31'),
      inclusive: true,
      errorMessage: { 
          max: `Validation failed: Value must be less than or equal to ${new Date('2023-12-31').toISOString()}.`
      }
    })
    date: Date;

    @Range<number>({
        min: 1,
        max: 100,
        step: 10,
        inclusive: true,
        message: "The score must be between 1 and 100 and divisible by 10."
    })
    score: number;

    constructor(date: Date, score: number) {
        this.date = date;
        this.score = score;
    }
}

describe('Event with Range Decorator', () => {
  it('should accept valid date and score values', () => {
      expect(() => new Event(new Date('2023-06-15'), 10)).not.toThrow();
  });

  it('should reject a date outside the specified range', () => {
    const maxDate = new Date('2023-12-31');
    const expectedErrorMessage = `Validation failed: Value must be less than or equal to ${maxDate.toISOString()}.`;

    expect(() => new Event(new Date('2024-01-01'), 10)).toThrow(expectedErrorMessage);
  });

  it('should reject a score not divisible by 10', () => {
    // Usa el mensaje de error exacto que produce validateRange
    const expectedErrorMessage = "Validation failed: Value must be a multiple of 10.";
    expect(() => new Event(new Date('2023-06-15'), 15)).toThrow(expectedErrorMessage);
  });
});
