/**
 * Represents an asynchronous function that returns a promise that resolves to void.
 *
 * @returns A promise that resolves to void.
 */
export type AsyncVoidFunction = () => Promise<void>;

/**
 * Represents a function with arguments.
 *
 * @typeParam TReturn - The return type of the function.
 * @typeParam TParams - The types of the function arguments.
 *
 * @param args - The arguments of the function.
 * @returns The return value of the function.
 */
export type FunctionWithArgs<TReturn, TParams extends unknown[] = []> = (...args: TParams) => TReturn;

/**
 * Represents a function with arguments that returns void.
 *
 * @typeParam TParams - The types of the function arguments.
 *
 * @param args - The arguments of the function.
 *
 * @returns Nothing.
 */
export type VoidFunctionWithArgs<TParams extends unknown[] = []> = FunctionWithArgs<void, TParams>;
