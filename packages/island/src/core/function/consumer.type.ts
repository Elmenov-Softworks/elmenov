/**
 * Represents an operation that accepts a single argument and returns no result.
 *
 * @remarks Consumer is expected to operate via side-effects.
 *
 * @typeParam T - The type of the parameter.
 *
 * @param param - The parameter for the operation.
 */
export type Consumer<T> = (param: T) => void;
