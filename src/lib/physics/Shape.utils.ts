import { Shape, ShapeCircle, ShapeKind, ShapeRectangle } from './Shape';

type WithoutAreaKind<A extends Shape> = Omit<A, 'kind'>;

type InitAreaFunc<A extends Shape> = (value: WithoutAreaKind<A>) => A;

export const initShapeCircle: InitAreaFunc<ShapeCircle> = (value) => ({
  kind: ShapeKind.Circle,
  ...value,
});

export const initShapeRectangle: InitAreaFunc<ShapeRectangle> = (value) => ({
  kind: ShapeKind.Rectangle,
  ...value,
});
