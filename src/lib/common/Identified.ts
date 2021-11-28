import { OpaqueString } from './OpaqueString';

export type Identified<T extends string> = {
  /**
   * entity unique identifier
   */
  readonly id: OpaqueString<T>;
};
