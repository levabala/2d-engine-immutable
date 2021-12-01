import { Shape, ShapeCircle, ShapeKind, ShapeRectangle } from './Shape';

export type WithoutShapeKind<A extends Shape> = Omit<A, 'kind'>;

type InitAreaFunc<A extends Shape> = (value: WithoutShapeKind<A>) => A;

export const initShapeCircle: InitAreaFunc<ShapeCircle> = (value) => ({
  kind: ShapeKind.Circle,
  ...value,
});

export const initShapeRectangle: InitAreaFunc<ShapeRectangle> = (value) => ({
  kind: ShapeKind.Rectangle,
  ...value,
});
