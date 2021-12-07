import { Coordinate, distanceBetweenCoordinates } from './Coordinate';
import { Shape, ShapeCircle, ShapeRectangle } from './Shape';
import { calcRectangleBoxed } from './ShapePositioned.utils';

export type ShapePositioned<S extends Shape = Shape> = S & Coordinate;

export type ShapeBoxed = {
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
  readonly right: number;
};

export type ShapeRectangleBoxed = ShapePositioned<ShapeRectangle> & ShapeBoxed;

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

export const hasInteractionRectangleRectangle: HasIntersectionFunc<
  ShapeRectangle,
  ShapeRectangle
> = (rect1, rect2) => {
  const r1 = calcRectangleBoxed(rect1);
  const r2 = calcRectangleBoxed(rect2);

  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
};

// TODO: circle-rectangle intersection
// TODO: dynamic hasIntersection (auto match intersection func from shape kind)
