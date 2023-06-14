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
