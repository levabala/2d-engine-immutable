import { distanceBetweenPoints, Point } from './Point';
import { Shape, ShapeCircle, ShapeRectangle } from './Shape';
import { calcRectangleBoxed } from './ShapePositioned.utils';

export type ShapePositioned<S extends Shape = Shape> = S & Point;

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
  const distance = distanceBetweenPoints(circle1, circle2);
  const distanceMin = circle1.radius + circle2.radius;

  return distance <= distanceMin;
};

export const hasInteractionRectangleRectangleBoxed: HasIntersectionFunc<
  ShapeRectangleBoxed,
  ShapeRectangleBoxed
> = (rect1, rect2) =>
  !(
    rect2.left > rect1.right ||
    rect2.right < rect1.left ||
    rect2.top > rect1.bottom ||
    rect2.bottom < rect1.top
  );

export const hasInteractionRectangleRectangle: HasIntersectionFunc<
  ShapeRectangle,
  ShapeRectangle
> = (rect1, rect2) => {
  const r1 = calcRectangleBoxed(rect1);
  const r2 = calcRectangleBoxed(rect2);

  return hasInteractionRectangleRectangleBoxed(r1, r2);
};

// TODO: circle-rectangle intersection
// TODO: dynamic hasIntersection (auto match intersection func from shape kind)
