/**
 * Defines the type of class constructors.
 *
 * @typeParam TCtor - The type of the class constructor.
 * @typeParam TParams - The type of the parameters of the class constructor.
 */
// eslint-disable-next-line @typescript-eslint/prefer-function-type
export type CtorType<TCtor, TParams extends unknown[] = []> = { new (...args: TParams): TCtor };
