/**
 * Represents a function with single argument.
 *
 * @typeParam TParam - Type of the parameter.
 * @typeParam TReturn - Type of the return value.
 *
 * @param param - Parameter of the function.
 */
export type ArgFunction<TParam, TReturn> = (param: TParam) => TReturn;
