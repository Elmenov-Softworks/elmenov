/**
 * Zero value for types, representing an uninitialized value.
 *
 * @remarks In TypeScript, `nil` is an union of the null and undefined types.
 * This is necessary in order not to use the `undefined` or `null` type
 * explicitly in the code.
 */
export type Nil = null | undefined;

/**
 * Makes the type optional - that is, it may or may not be present.
 *
 * @typeParam T - The type to make optional.
 */
export type Optional<T> = T | undefined;

/**
 * `Nullable` is an extension of the specified type that allows storing the null
 * value (that is, unlike standard types, `Nullable` types allow not storing any value).
 *
 * @typeParam T - The type to make nullable.
 */
export type Nullable<T> = T | Nil;
