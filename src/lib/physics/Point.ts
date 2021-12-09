import { Vector } from './Vector';

export type Point = Vector<''>; // vector without prefix

export const POINT_ZERO: Point = { x: 0, y: 0 };

// TODO: implement for short init functions?
// export type PointShort = readonly [number, number];

// export function initPoint([x, y]: PointShort): Point {
//   return { x, y };
// }

export function distanceBetweenPoints(c1: Point, c2: Point): number {
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;

  return Math.sqrt(dx ** 2 + dy ** 2);
}
