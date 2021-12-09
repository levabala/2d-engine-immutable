import { Vector } from './Vector';

export type Velocity = Vector;

export type WithVelocity = {
  readonly velocity: Vector;
};
