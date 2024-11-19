import { AssertionException } from '../exception/assertion.exception';
import { BrandBaseOf, BrandType, BrandValidator } from './brand.type';

/**
 * Class for working with branded types, used to create and check various
 * values for compliance with the branded type.
 *
 * @example
 * ```typescript
 * type NonNegative = BrandType<number, 'NonNegative'>;
 * const NonNegative = new BrandStructure<NonNegative>(x => x >= 0);
 *
 * const positive = NonNegative.identity(1);
 * const negative = NonNegative.identity(-1); // throws exception
 *
 * if (NonNegative.is(255)) { ... }
 * ```
 */
export class BrandStructure<TBrand extends BrandType<TBase, unknown>, TBase = BrandBaseOf<TBrand>> {
  #validator: BrandValidator<TBase>;

  /**
   * Constructs a new instance of `BrandStructure`. Validator should check
   * for conformance to the branded type.
   */
  constructor(validator: BrandValidator<TBase>) {
    this.#validator = validator;
  }

  /**
   * Checks if a value matches the branded type.
   *
   * Returns boolean value.
   *
   * @example
   * ```typescript
   * type NonNegative = BrandType<number, 'NonNegative'>;
   * const NonNegative = new BrandStructure<NonNegative>(x => x >= 0);
   *
   * if (NonNegative.is(255)) { ... }
   * ```
   */
  is(value: TBase): value is TBrand {
    return this.#validator(value) === true;
  }

  /**
   * Asserts that a value matches the branded type.
   *
   * @throws {AssertionException} if the value does not match the branded type.
   *
   * @example
   * ```typescript
   * type NonNegative = BrandType<number, 'NonNegative'>;
   * const NonNegative = new BrandStructure<NonNegative>(x => x >= 0);
   *
   * NonNegative.assert(-1) // throws exception
   * ```
   */
  assert(value: TBase): asserts value is TBrand {
    const result = this.#validator(value);

    if (typeof result === 'string') {
      throw new AssertionException(result);
    }

    if (result === false) {
      throw new AssertionException(`Invalid value ${value}`);
    }
  }

  /**
   * Returns the value if it matches the branded type. And the value will be
   * strictly typed according to the branded type.
   *
   * @throws {AssertionException} if the value does not match the branded type.
   */
  identity(value: TBase): TBrand {
    this.assert(value);

    return value as unknown as TBrand;
  }

  get [Symbol.toStringTag]() {
    return 'Brand';
  }
}
