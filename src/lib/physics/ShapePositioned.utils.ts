import { Shape, ShapeCircle, ShapeKind, ShapeRectangle } from './Shape';
import { WithoutShapeKind } from './Shape.utils';
import { ShapePositioned, ShapeRectangleBoxed } from './ShapePositioned';

type InitShapePositionedFunc<A extends Shape> = (
  value: WithoutShapeKind<ShapePositioned<A>>
) => ShapePositioned<A>;

export const initShapePositionedCircle: InitShapePositionedFunc<ShapeCircle> = (
  value
) => ({
  kind: ShapeKind.Circle,
  ...value,
});

export const initShapePositionedRectangle: InitShapePositionedFunc<
  ShapeRectangle
> = (value) => ({
  kind: ShapeKind.Rectangle,
  ...value,
});

export function calcRectangleBoxed(
  rect: ShapePositioned<ShapeRectangle>
): ShapeRectangleBoxed {
  return {
    ...rect,
    top: rect.y - rect.height / 2,
    bottom: rect.y + rect.height / 2,
    left: rect.x - rect.width / 2,
    right: rect.x + rect.width / 2,
  };
}
