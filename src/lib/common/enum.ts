export type Enum<T extends readonly string[]> = {
  readonly [key in T[number]]: key;
};
export function initEnum<T extends readonly string[]>(values: T): Enum<T> {
  // need force cast because typescript does not support index array typing
  return values.reduce((acc, val) => ({ ...acc, [val]: val }), {}) as Enum<T>;
}
