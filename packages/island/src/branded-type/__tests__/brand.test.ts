import { AssertionException } from '../../exception/assertion.exception';
import { RuntimeException } from '../../exception/runtime.exception';
import { BrandStructure } from '../brand.struct';
import { BrandType, BrandValidator } from '../brand.type';

describe('Branded Types', () => {
  const error = 'Value must not be negative';
  const validator: BrandValidator<number> = jest.fn(x => x >= 0 || error);

  type NonNegative = BrandType<number, 'NonNegative'>;
  const NonNegative = new BrandStructure<NonNegative>(validator);
  
  it('should create a branded value', () => {
    const zero = NonNegative.identity(0);

    expect(zero).toBe(0);
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(0);
  })

  it('should throw an RuntimeException when trying to create a negative branded value', () => {
    const testThrows = () => NonNegative.identity(-1);

    expect(testThrows).toThrow(RuntimeException);
    expect(testThrows).toThrow(error);
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(-1);
  })

  it('should validate the passed value as branded', () => {
    expect(NonNegative.is(0)).toBeTruthy(); 
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(0);
  });

  it('should validate the passed branded value', () => {
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

  it('should asserts the passed value as branded', () => {
    (() => NonNegative.assert(0))();

    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(0);
  });

  it('should asserts the passed branded value', () => {
    const zero = NonNegative.identity(0);

    (() => NonNegative.assert(zero))();
    
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(zero);
  });

  it('should throw an RuntimeException if the specified value does not pass validation', () => {
    const testThrows = () => NonNegative.assert(-1);

    expect(testThrows).toThrow(RuntimeException);
    expect(testThrows).toThrow(error);
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(-1);
  });

  it('should throw an InvalidValueException if the specified value does not pass validation', () => {
    const validator: BrandValidator<number> = jest.fn(x => x <= 0);

    type NonPositive = BrandType<number, 'NonPositive'>;
    const NonPositive = new BrandStructure<NonPositive>(validator);

    const testThrows = () => NonPositive.assert(1);

    expect(testThrows).toThrow(AssertionException);
    expect(testThrows).toThrow(`Invalid value ${1}`);
    expect(validator).toHaveBeenCalled();
    expect(validator).toHaveBeenCalledWith(1);
  });
})