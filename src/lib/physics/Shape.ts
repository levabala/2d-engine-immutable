import { initEnum } from '../common';

export const ShapeKindValues = ['Circle', 'Rectangle'] as const;
export type ShapeKindValues = typeof ShapeKindValues;
export const ShapeKind = initEnum(ShapeKindValues);
export type ShapeKind = typeof ShapeKind;

export type ShapeCircle = {
  readonly kind: ShapeKind['Circle'];
  readonly radius: number;
};

export type ShapeRectangle = {
  readonly kind: ShapeKind['Rectangle'];
  readonly width: number;
  readonly height: number;
};

export type Shape = ShapeCircle | ShapeRectangle;

export type WithShape = {
  readonly Shape: Shape;
};
