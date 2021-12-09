export type Point = {
  /**
   * X axis coordinate
   */
  readonly x: number;
  /**
   * Y axis coordinate
   */
  readonly y: number;
};

export function distanceBetweenPoints(c1: Point, c2: Point): number {
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;

  return Math.sqrt(dx ** 2 + dy ** 2);
}
