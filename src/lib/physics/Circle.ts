import { distanceBetweenPoints, Point } from './Point';

export type Circle = {
  readonly radius: number;
};

export type CirclePositioned = Circle & Point;

export function hasIntersectionCircleCircle(
  circle1: CirclePositioned,
  circle2: CirclePositioned
): boolean {
  const distance = distanceBetweenPoints(circle1, circle2);
  const distanceMin = circle1.radius + circle2.radius;

  return distance <= distanceMin;
}
