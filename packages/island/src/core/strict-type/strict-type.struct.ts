import { AssertionException } from '../../exception/assertion.exception';
import { StrictBaseOf, Strict, StrictValidator } from './strict.type';

/**
 * Class for working with strict types, used to create and check various
 * values for compliance with the strict type.
 *
 * @example
 * ```typescript
 * type NonNegative = Strict<number, 'NonNegative'>;
 * const NonNegative = new StrictType<NonNegative>(x => x >= 0);
 *
 * const positive = NonNegative.identity(1);
 * const negative = NonNegative.identity(-1); // throws AssertionException
 *
 * if (NonNegative.is(255)) { ... }
 * ```
 *
 * @typeParam TStrict - The strict type.
 * @typeParam TBase - The base type, obtained from the passed strict type.
 */
export class StrictType<TStrict extends Strict<TBase, unknown>, TBase = StrictBaseOf<TStrict>> {
  #validator: StrictValidator<TBase>;

  /**
   * Constructs a new instance of `StrictType`. Validator should check for
   * conformance to the strict type.
   *
   * @param validator - The validator that should check for conformance to the
   * strict type.
   */
  constructor(validator: StrictValidator<TBase>) {
    this.#validator = validator;
  }

  /**
   * Checks if a value matches to the strict type.
   *
   * @example
   * ```typescript
   * type NonNegative = Strict<number, 'NonNegative'>;
   * const NonNegative = new StrictType<NonNegative>(x => x >= 0);
   *
   * if (NonNegative.is(255)) { ... }
   * ```
   *
   * @param value - The value to check.
   *
   * @returns Result of checking through the validator with subsequent
   * casting of the type.
   */
  is(value: TBase): value is TStrict {
    return this.#validator(value) === true;
  }

  /**
   * Asserts that a value matches to the strict type.
   *
   * @example
   * ```typescript
   * type NonNegative = Strict<number, 'NonNegative'>;
   * const NonNegative = new StrictType<NonNegative>(x => x >= 0);
   *
   * NonNegative.assert(-1) // throws AssertionException
   * ```
   *
   * @throws {@link "exception/assertion.exception" | AssertionException} if the value does not match to the strict type.
   *
   * @param value - The value to check.
   *
   * @returns Nothing if it matches the strict type.
   */
  assert(value: TBase): asserts value is TStrict {
    const result = this.#validator(value);

    if (typeof result === 'string') {
      throw new AssertionException(result);
    }

    if (result === false) {
      throw new AssertionException(`Invalid value ${value}`);
    }
  }

  /**
   * Returns the value if it matches the strict type. And the value will be
   * strictly typed according to the strict type.
   *
   * @example
   * ```typescript
   * type NonNegative = Strict<number, 'NonNegative'>;
   * const NonNegative = new StrictType<NonNegative>(x => x >= 0);
   *
   * const positive = NonNegative.identity(1);
   * const negative = NonNegative.identity(-1); // throws AssertionException
   * ```
   *
   * @throws {@link "exception/assertion.exception" | AssertionException} if the value does not match to the strict type.
   */
  identity(value: TBase): TStrict {
    this.assert(value);

    return value as unknown as TStrict;
  }

  /**
   * @hidden
   */
  get [Symbol.toStringTag]() {
    return 'StrictType' as const;
  }
}
