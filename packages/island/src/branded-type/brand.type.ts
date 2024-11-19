declare const __brand: unique symbol;
declare const __base: unique symbol

type BrandInfo<TBase, TBrand> = {
  [__brand]: TBrand;
  [__base]: TBase;
};

/**
 * The `BrandType` type is a type for even more strict data typing. In standard
 * TypeScript, two variables with the `number` type will be the same, although
 * they can carry different typical loads. This pattern allows you to separate
 * this, making it so that one `number` type will differ from the other (there
 * are no restrictions on the base type).
 * 
 * `BrandType` takes two parameters - one is responsible for the base type,
 * which will be the main one during typing. And the second is the brand marking,
 * thanks to which one type will differ from another.
 * 
 * It is important to know that the branding type must be unique. Two brands
 * specified with the same types will be considered the same type.
 *
 * @example
 * ```typescript
 * type UserId = BrandType<string, 'UserId'>;
 * type UserName = BrandType<string, 'UserName'>;
 * 
 * const userId: UserId = 'uniqueId';
 * const userName: UserName = 'uniqueName';
 * const userIdByName: UserId = userName; // throws an error
 * ```
 */
export type BrandType<TBase, TBrand> = TBase & BrandInfo<TBase, TBrand>;

/**
 * Returns the base brand type.
 * 
 * @example
 * ```typescript
 * type UserId = BrandType<string, 'UserId'>;
 * type AnotherType = BrandBaseOf<UserId>; // returns string
 * ```
 */
export type BrandBaseOf<T> = T extends BrandType<infer TBase, unknown> ? TBase : never;

/**
 * Type for the validator function that should check for conformance to the
 * branded type. Used in `BrandStructure`.
 * 
 * If a string is returned, the specified string will be passed to the error body.
 */
export type BrandValidator<T> = (value: T) => boolean | string;