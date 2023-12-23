/**
 * Function that compares the type of the given {@link value} to validate
 * whether or not it is an object. Also, `null` values are NOT considered
 * objects by this function.
 */
export function isObject<T extends object>(value: unknown): value is T {
  return typeof value === "object" && value !== null;
}

/**
 * Function that compares the type of the given {@link value} to validate
 * whether or not it is an object-like value. Also, `null` values are considered
 * objects by this function.
 */
export function isObjectLike<T extends object>(value: unknown): value is T {
  return typeof value === "object";
}

/**
 * Function that compares the type of the given {@link value} to validate
 * whether or not it is a plain object. Also, `null` values are NOT considered
 * plain objects by this function.
 */
export function isPlainObject<T extends object>(value: unknown): value is T {
  return isObject<T>(value) && value.constructor === Object;
}

/**
 * A semantical exception thrown when the given parameter is not an object.
 */
export class ParameterNotAnObjectException extends Error {
  constructor(value: unknown) {
    super(`Given parameter is not an object: ${value}`);
  }
}

/**
 * Function that compares the type of the given {@link value} to validate
 * whether or not it is an empty object. If the given {@link value} is not
 * asserted as an object by the {@link isObject | `isObject()`} function, then
 * this function will throw an {@link ParameterNotAnObjectException | error}.
 *
 * @see {@link isObject}
 */
export function isObjectEmpty<T extends object>(value: T): boolean {
  if (!isObject<T>(value)) {
    throw new ParameterNotAnObjectException(value);
  }

  return JSON.stringify(value) === "{}";
}

/**
 * Function that attempts to parse the given {@link value} as a JSON string. If
 * the given {@link value} is not a valid JSON string, then this function will
 * return `null`. The `TypeError` thrown by the `JSON.parse()` function is
 * caught and handled by this function.
 */
export function parseJSONOrCoerceToNull<T extends object>(value: string): T | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
