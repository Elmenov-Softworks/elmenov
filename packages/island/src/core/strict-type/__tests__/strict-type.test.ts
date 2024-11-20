import { AssertionException } from '../../../exception/assertion.exception';
import { StrictType } from '../strict-type.struct';
import { Strict, StrictValidator } from '../strict.type';

describe('Strict Types', () => {
  const error = 'Value must not be negative';
  const validator: StrictValidator<number> = jest.fn(x => x >= 0 || error);

  type NonNegative = Strict<number, 'NonNegative'>;
  const NonNegative = new StrictType<NonNegative>(validator);

  it('should create a strict value', () => {
    const zero = NonNegative.identity(0);

    expect(zero).toBe(0);
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(0);
  });

  it('should throw an AssertionException when trying to create a negative strict value', () => {
    const testThrows = () => NonNegative.identity(-1);

    expect(testThrows).toThrow(AssertionException);
    expect(testThrows).toThrow(error);
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(-1);
  });

  it('should validate the passed value as strict', () => {
    expect(NonNegative.is(0)).toBeTruthy();
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(0);
  });

  it('should validate the passed strict value', () => {
    const zero = NonNegative.identity(0);

    expect(NonNegative.is(zero)).toBeTruthy();
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(zero);
  });

  it('should not validate the passed value', () => {
    expect(NonNegative.is(-1)).toBeFalsy();
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(-1);
  });

  it('should asserts the passed value as strict', () => {
    (() => NonNegative.assert(0))();

    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(0);
  });

  it('should asserts the passed strict value', () => {
    const zero = NonNegative.identity(0);

    (() => NonNegative.assert(zero))();

    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(zero);
  });

  it('should throw an AssertionException if the specified value does not pass validation', () => {
    const testThrows = () => NonNegative.assert(-1);

    expect(testThrows).toThrow(AssertionException);
    expect(testThrows).toThrow(error);
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(-1);
  });

  it('should throw an AssertionException if the specified value does not pass validation', () => {
    const validator: StrictValidator<number> = jest.fn(x => x <= 0);

    type NonPositive = Strict<number, 'NonPositive'>;
    const NonPositive = new StrictType<NonPositive>(validator);

    const testThrows = () => NonPositive.assert(1);

    expect(testThrows).toThrow(AssertionException);
    expect(testThrows).toThrow(`Invalid value ${1}`);
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(1);
  });
});
