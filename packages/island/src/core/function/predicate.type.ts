/**
 * Represents a predicate (boolean-valued function) of one argument.
 *
 * @typeParam TValue - The type of the value.
 *
 * @param value - The value to test.
 */
export type Predicate<TValue> = (value: TValue) => boolean;
