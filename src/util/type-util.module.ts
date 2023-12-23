/**
 * The `RemoveSuffix<T extends string, S extends string>` type removes the suffix {@link S} from the string {@link T}.
 * If {@link T} does not end with {@link S}, {@link T} is returned unchanged.
 *
 * @example
 * ```ts
 * type T0 = RemoveSuffix<'foobar', 'bar'>;  // expected to be 'foo'
 * ```
 */
export type RemoveSuffix<T extends string, S extends string> = T extends `${infer U}${S}` ? U : T;

/**
 * The `ArrayItem<T>` type gets the type of the items of the array {@link T}.
 */
export type ArrayItem<T> = T extends readonly (infer U)[] | (infer U)[] | Readonly<infer U> | Array<infer U>
  ? U
  : never;
