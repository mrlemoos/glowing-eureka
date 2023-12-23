/**
 * This function maps through an enum object and returns an array of the given
 * {@link enumObject}.
 */
export function getEnumValues<T extends object>(enumObject: T) {
  return Object.keys(enumObject).map(function (key) {
    const castTypeKey = key as keyof T;

    return enumObject[castTypeKey];
  });
}
