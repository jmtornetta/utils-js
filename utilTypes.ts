/**
 * Get object with the selected key made optional (partial).
 */
export type PartialBy<TObj, TObjKey extends keyof TObj> = Omit<TObj, TObjKey> &
  Partial<Pick<TObj, TObjKey>>;
/**
 * Get object with the selected key made required.
 */
export type RequiredBy<TObj, TObjKey extends keyof TObj> = TObj &
  Required<Pick<TObj, TObjKey>>;
/**
 * Get object keys whose values match a given type.
 */
export type KeysMatching<TObj, TMatching> = {
  [TObjKey in keyof TObj]-?: TObj[TObjKey] extends TMatching ? TObjKey : never;
}[keyof TObj];
/**
 * Map over the keys of two object types and, if both keys are present, get the union of them. Otherwise, use the type of the first object's key.
 */
export type UnionOfMatchingKeys<TObjA, TObjB> = {
  [P in keyof TObjA]: P extends keyof TObjB ? TObjA[P] | TObjB[P] : TObjA[P];
};
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
/**
 * Create a tuple type of a given type and length.
 */
export type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
