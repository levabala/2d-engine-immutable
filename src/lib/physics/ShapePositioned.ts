import { Coordinate, distanceBetweenCoordinates } from './Coordinate';
import { Shape, ShapeCircle, ShapeKind, ShapeRectangle } from './Shape';
import { calcRectangleCoordinates } from './ShapePositioned-utils';

export type ShapePositioned<S extends Shape = Shape> = S & Coordinate;

export type ShapeRectanglePositioned = {
  readonly kind: ShapeKind['Rectangle'];
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
  readonly right: number;
};

type HasIntersectionFunc<A1 extends Shape, A2 extends Shape> = (
  area1: ShapePositioned<A1>,
  area2: ShapePositioned<A2>
) => boolean;

export const hasIntersectionCircleCircle: HasIntersectionFunc<
  ShapeCircle,
  ShapeCircle
> = (circle1, circle2) => {
  const distance = distanceBetweenCoordinates(circle1, circle2);
  const distanceMin = circle1.radius + circle2.radius;

  return distance <= distanceMin;
};

// TODO: support already positioned rectangles
export const hasInteractionRectangleRectangle: HasIntersectionFunc<
  ShapeRectangle,
  ShapeRectangle
> = (rect1, rect2) => {
  const r1 = calcRectangleCoordinates(rect1);
  const r2 = calcRectangleCoordinates(rect2);

  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
};

// TODO: circle-rectangle intersection
