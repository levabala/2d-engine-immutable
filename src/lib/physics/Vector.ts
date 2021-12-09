import { Either, left, right } from 'fp-ts/lib/Either';

import { initEnum } from '../common';

import { Point } from './Point';

export type VectorTuple = readonly [number, number];

export const VECTOR_DEFAULT_PREFIX = 'd';
export type VECTOR_DEFAULT_PREFIX = typeof VECTOR_DEFAULT_PREFIX;

export type Vector<Prefix extends string = VECTOR_DEFAULT_PREFIX> = {
  readonly [key in `${Prefix}x` | `${Prefix}y`]: number; // dx/dy by default
};

export const VECTOR_ZERO: Vector = { dx: 0, dy: 0 };

export type VectorPositioned<Prefix extends string = VECTOR_DEFAULT_PREFIX> =
  Vector<Prefix> & Point;

export function initVectorTuple([dx, dy]: VectorTuple): Vector {
  return {
    dx,
    dy,
  };
}

export function initVectorPoints(c1: Point, c2: Point): VectorPositioned {
  return {
    x: c1.x,
    y: c1.y,
    dx: c2.x - c1.x,
    dy: c2.y - c1.y,
  };
}

export function getMagnitude(vector: Vector): number {
  return Math.sqrt(vector.dx ** 2 + vector.dy ** 2);
}

export function getDotProduct(vector1: Vector, vector2: Vector): number {
  return vector1.dx * vector2.dx + vector1.dy * vector2.dy;
}

export function getAngle(vector1: Vector, vector2: Vector): number {
  return Math.acos(
    getDotProduct(vector1, vector2) /
      (getMagnitude(vector1) * getMagnitude(vector2))
  );
}

export const GetAngleSafeError = initEnum(['MAGNITUDE_EQUALS_ZERO'] as const);
export type GetAngleSafeErrorMap = typeof GetAngleSafeError;
export type GetAngleSafeError =
  GetAngleSafeErrorMap[keyof GetAngleSafeErrorMap];

export function getAngleSafe(
  vector1: Vector,
  vector2: Vector
): Either<GetAngleSafeError, number> {
  const m1 = getMagnitude(vector1);
  const m2 = getMagnitude(vector2);

  return m1 === 0 || m2 === 0
    ? left(GetAngleSafeError.MAGNITUDE_EQUALS_ZERO)
    : right(Math.acos(getDotProduct(vector1, vector2) / (m1 * m2)));
}
