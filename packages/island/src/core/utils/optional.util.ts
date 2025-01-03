import { NilArgumentException } from '../../exception/nil-argument.exception';
import { NoSuchElementException } from '../../exception/no-such-element.exception';
import { ArgFunction } from '../function/arg-function.type';
import { Consumer } from '../function/consumer.type';
import { Predicate } from '../function/predicate.type';
import { Nil, Nullable } from '../types';
import { isNil } from './is-nil.util';

/**
 * A container object which may or may not contain a non-null value. If a value
 * is present, {@link Optional.isPresent} returns `true`. If no value is present, the object
 * is considered empty and {@link Optional.isPresent} returns `false`. Additional methods
 * that depend on the presence or absence of a contained value are provided,
 * such as {@link Optional.orElse} (returns a default value if no value is present) and
 * {@link Optional.ifPresent} (performs an action if a value is present).
 *
 * This is a value-based class; use of identity-sensitive operations (including
 * reference equality (`==`), identity hash code, or syncing) on instances of
 * `Optional` may have unpredictable results and should be avoided.
 *
 * @remarks `Optional` is primarily intended for use as a method return
 * type where there is a clear need to represent "no result" and where using
 * `null` is likely to cause errors. A variable whose type is `Optional`
 * should never itself be `null`; it should always point to an `Optional`
 * instance.
 *
 * @example
 * ```typescript
 * // First example
 * class Apartment {
 *   #kitchen: Kitchen;
 *
 *   getKitchen(): Optional<Kitchen> {
 *     return Optional.ofNullable(kitchen);
 *   }
 *
 *   setKitchen(kitchen: Kitchen) {
 *     this.kitchen = kitchen;
 *   }
 * }
 *
 * const apartment = new Apartment();
 * const maybeKitchen = apartment.getKitchen(); // Optional<Kitchen>;
 * const kitchen = maybeKitchen.orElse(new Kitchen());
 *
 * // Second example
 * const maybeKitchen1: Optional<Kitchen> = Optional.ofNullable(new Kitchen());
 * const maybeKitchen2: Optional<Kitchen> = Optional.ofNullable(null);
 *
 * assert(maybeKitchen1.isPresent()); // Value is present
 * assert(maybeKitchen2.isPresent()); // throws AssertionException
 * ```
 *
 * @typeParam T - The type of value.
 */
export class Optional<T> {
  #value: Nullable<T>;

  /**
   * Returns an empty `Optional<T>` instance. No value is present for this
   * `Optional<T>`.
   *
   * @typeParam T - The type of the non-existent value.
   *
   * @returns An empty `Optional<T>`.
   */
  static empty<T>(): Optional<T> {
    return new Optional<T>(null);
  }

  /**
   * Returns an `Optional` describing the given non-null value.
   *
   * @typeParam T - The type of the value.
   *
   * @param value - The value to describe, which must be non-null.
   *
   * @throws {@link "exception/nil-argument.exception" | NilArgumentException} if
   * `value` is `null`.
   *
   * @returns An `Optional` with the value present.
   */
  static of<T>(value: T): Optional<T> {
    if (isNil(value)) {
      throw new NilArgumentException();
    }

    return new Optional<T>(value);
  }

  /**
   * Returns an `Optional` describing the given value, if non-null,
   * otherwise returns an empty `Optional`.
   *
   * @typeParam T - The type of the value.
   *
   * @param value - The possibly-null value to describe.
   *
   * @returns An `Optional` with a present value if the specified value
   * is non-null, otherwise an empty `Optional`.
   */
  static ofNullable<T>(value: Nullable<T>): Optional<T> {
    return new Optional<T>(value);
  }

  /**
   * @param value - The possibly-null value to describe.
   */
  constructor(value: Nullable<T>) {
    this.#value = value;
  }

  /**
   * If a value is present, returns the value, otherwise throws
   * `NoSuchElementException`.
   *
   * @remarks The preferred alternative to this method is {@link Optional.orElseThrow}.
   *
   * @throws {@link "exception/no-such-element.exception" | NoSuchElementException} if
   * no value is present.
   *
   * @returns The non-null value described by this `Optional`.
   */
  get(): T {
    if (isNil(this.#value)) {
      throw new NoSuchElementException();
    }

    return this.#value;
  }

  /**
   * If a value is present, returns `true`, otherwise `false`.
   *
   * @returns `true` if a value is present, otherwise `false`.
   */
  isPresent(): boolean {
    return !isNil(this.#value);
  }

  /**
   * If a value is present, performs the given action with the value,
   * otherwise does nothing.
   *
   * @param action - The action to be performed, if a value is present.
   *
   * @throws {@link "exception/nil-argument.exception" | NilArgumentException} if
   * value is present and the given consumer is `null`.
   */
  ifPresent(action: Consumer<T>): void {
    if (!isNil(this.#value)) {
      if (isNil(action)) {
        throw new NilArgumentException();
      }

      action(this.#value);
    }
  }

  /**
   * If a value is present, performs the given action with the value,
   * otherwise performs the given empty-based action.
   *
   * @param action - The action to be performed, if a value is present.
   * @param emptyAction - The empty-based action to be performed, if no value is
   * present.
   *
   * @throws {@link "exception/nil-argument.exception" | NilArgumentException} if
   * a value is present and the given action is `null`, or no value is present and the given empty-based action is `null`.
   */
  ifPresentOrElse(action: Consumer<T>, emptyAction: Consumer<Nil>): void {
    if (!isNil(this.#value)) {
      if (isNil(action)) {
        throw new NilArgumentException();
      }

      action(this.#value);
    } else {
      if (isNil(emptyAction)) {
        throw new NilArgumentException();
      }

      emptyAction(this.#value);
    }
  }

  /**
   * If a value is present, and the value matches the given predicate,
   * returns an `Optional` describing the value, otherwise returns an
   * empty `Optional`.
   *
   * @param predicate - The predicate to apply to a value, if present.
   *
   * @throws {@link "exception/nil-argument.exception" | NilArgumentException} if
   * the predicate is `null`.
   *
   * @returns An `Optional` describing the value of this `Optional`, if a value
   * is present and the value matches the given predicate, otherwise an
   * empty `Optional`.
   */
  filter(predicate: Predicate<T>): Optional<T> {
    if (isNil(predicate)) {
      throw new NilArgumentException();
    }

    if (!isNil(this.#value) && predicate(this.#value)) {
      return new Optional<T>(this.#value);
    } else {
      return Optional.empty<T>();
    }
  }

  /**
   * If a value is present, returns an `Optional` describing
   * (as if by {@link Optional.ofNullable}) the result of applying the given
   * mapping function to the value, otherwise returns an empty `Optional`.
   *
   * If the mapping function returns a null result then this method returns
   * an empty `Optional`.
   *
   * @typeParam TResult - The type of the value returned from the mapping function.
   *
   * @param mapper - The mapping function to apply to a value, if present.
   *
   * @throws {@link "exception/nil-argument.exception" | NilArgumentException} if
   * the mapping function is `null`.
   *
   * @returns An `Optional` describing the result of applying a mapping
   * function to the value of this `Optional`, if a value is present,
   * otherwise an empty `Optional`.
   */
  map<TResult>(mapper: ArgFunction<T, TResult>): Optional<TResult> {
    if (isNil(mapper)) {
      throw new NilArgumentException();
    }

    if (!isNil(this.#value)) {
      const result = mapper(this.#value);

      if (!isNil(result)) {
        return new Optional<TResult>(result);
      } else {
        return Optional.empty();
      }
    } else {
      return Optional.empty<TResult>();
    }
  }

  /**
   * If a value is present, returns the result of applying the given
   * `Optional`-bearing mapping function to the value, otherwise returns
   * an empty `Optional`.
   *
   * This method is similar to {@link Optional.map}, but the mapping function
   * is one whose result is already an `Optional`, and if invoked, `flatMap`
   * does not wrap it within an additional `Optional`.
   *
   * @typeParam TResult - The type of value of the `Optional` returned by the
   * mapping function.
   *
   * @param mapper - The mapping function to apply to a value, if present.
   *
   * @throws {@link "exception/nil-argument.exception" | NilArgumentException} if
   * the mapping function is `null`.
   *
   * @returns The result of applying an `Optional`-bearing mapping function
   * to the value of this `Optional`, if a value is present, otherwise
   * an empty `Optional`.
   */
  flatMap<TResult>(mapper: ArgFunction<T, Optional<TResult>>): Optional<TResult> {
    if (isNil(mapper)) {
      throw new NilArgumentException();
    }

    if (!isNil(this.#value)) {
      const result = mapper(this.#value);

      if (!isNil(result)) {
        return result;
      } else {
        return Optional.empty();
      }
    } else {
      return Optional.empty<TResult>();
    }
  }
}
