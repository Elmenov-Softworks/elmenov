/**
 * Represents a supplier of results.
 *
 * @typeParam TResult - The type of results supplied by this supplier.
 */
export type Supplier<TResult> = () => TResult;
