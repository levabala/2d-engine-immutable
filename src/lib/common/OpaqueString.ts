// https://github.com/Microsoft/Typescript/issues/202#issuecomment-811246768
// eslint-disable-next-line functional/no-class
export declare class OpaqueString<T extends string> extends String {
  /** This helps typescript distinguish different opaque string types. */
  protected readonly __opaqueString: T;
  /** This object is already a string, but calling this makes method
   * makes typescript recognize it as such. */
  toString(): string;
}
