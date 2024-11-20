declare const __label: unique symbol;
declare const __base: unique symbol;

type StrictInfo<TBase, TLabel> = {
  [__label]: TLabel;
  [__base]: TBase;
};

/**
 * The `Strict` type is a type for even more strict data typing. In standard
 * TypeScript, two variables with the `number` type will be the same, although
 * they can carry different typical loads. This pattern allows you to separate
 * this, making it so that one `number` type will differ from the other (there
 * are no restrictions on the base type).
 *
 * `Strict` takes two parameters - one is responsible for the base type,
 * which will be the main one during typing. And the second is the type marking,
 * thanks to which one type will differ from another.
 *
 * @remarks It is important to know that the strict type must be unique. Two stricts
 * specified with the same types will be considered the same type.
 *
 * @example
 * ```typescript
 * type UserId = Strict<string, 'UserId'>;
 * type UserName = Strict<string, 'UserName'>;
 *
 * const userId: UserId = 'uniqueId';
 * const userName: UserName = 'uniqueName';
 * const userIdByName: UserId = userName; // throws an error
 * ```
 *
 * @typeParam TBase - The base type, the main type for a given strict type.
 * @typeParam TLabel - A label that will make the type strict.
 */
export type Strict<TBase, TLabel> = TBase & StrictInfo<TBase, TLabel>;

/**
 * Returns the base of the strict type.
 *
 * @example
 * ```typescript
 * type UserId = Strict<string, 'UserId'>;
 * type AnotherType = StrictBaseOf<UserId>; // returns string
 * ```
 *
 * @typeParam TStrict - The strict type.
 */
export type StrictBaseOf<TStrict> = TStrict extends Strict<infer TBase, unknown> ? TBase : never;

/**
 * Type for the validator function that should check for conformance to the
 * strict type.
 *
 * @typeParam TValue - The value to check.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is valid, `false` or `string` otherwise. If a string
 * is returned, the specified string will be passed to the error body.
 */
export type StrictValidator<TValue> = (value: TValue) => boolean | string;
