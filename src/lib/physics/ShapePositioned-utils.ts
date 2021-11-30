import { Coordinate } from './Coordinate';
import { ShapeKind, ShapeRectangle } from './Shape';
import { ShapeRectanglePositioned } from './ShapePositioned';

export function calcRectangleCoordinates(
  rect: ShapeRectangle & Coordinate
): ShapeRectanglePositioned {
  return {
    kind: ShapeKind.Rectangle,
    top: rect.y - rect.height / 2,
    bottom: rect.y + rect.height / 2,
    left: rect.x - rect.width / 2,
    right: rect.x + rect.width / 2,
  };
}
