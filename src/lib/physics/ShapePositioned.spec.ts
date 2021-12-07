import test from 'ava';

import {
  hasInteractionRectangleRectangle,
  hasIntersectionCircleCircle,
} from './ShapePositioned';
import {
  calcRectangleBoxed,
  initShapePositionedCircle,
} from './ShapePositioned.utils';

import { initShapePositionedRectangle } from '.';

test('init positioned circle', (t) => {
  const circle = initShapePositionedCircle({
    x: 10,
    y: 20,
    radius: 3,
  });

  t.deepEqual(circle, {
    kind: 'Circle',
    radius: 3,
    x: 10,
    y: 20,
  });
});

test('init positioned rectangle', (t) => {
  const rect = initShapePositionedRectangle({
    x: 10,
    y: 20,
    width: 10,
    height: 20,
  });

  t.deepEqual(rect, {
    kind: 'Rectangle',
    width: 10,
    height: 20,
    x: 10,
    y: 20,
  });
});

test('rectangle positioned calculation', (t) => {
  const rect = initShapePositionedRectangle({
    x: 10,
    y: 20,
    width: 10,
    height: 20,
  });

  const rectBoxed = calcRectangleBoxed(rect);

  t.deepEqual(rectBoxed, {
    kind: 'Rectangle',
    x: 10,
    y: 20,
    width: 10,
    height: 20,
    left: 5,
    right: 15,
    top: 10,
    bottom: 30,
  });
});

test('intersection circle-circle', (t) => {
  const c1 = initShapePositionedCircle({
    x: 10,
    y: 10,
    radius: 2,
  });

  const c2 = initShapePositionedCircle({
    x: 3,
    y: 2,
    radius: 3,
  });

  const c3 = initShapePositionedCircle({
    x: 9,
    y: 8,
    radius: 4,
  });

  const intersectionC1C2 = hasIntersectionCircleCircle(c1, c2);
  t.false(
    intersectionC1C2,
    'Circle1 and Circle2 must not have an intersection'
  );

  const intersectionC2C3 = hasIntersectionCircleCircle(c2, c3);
  t.false(
    intersectionC2C3,
    'Circle2 and Circle3 must not have an intersection'
  );

  const intersectionC1C3 = hasIntersectionCircleCircle(c1, c3);
  t.true(intersectionC1C3, 'Circle1 and Circle3 must to intersect');
});

test('intersection rectangle-rectangle', (t) => {
  const r1 = initShapePositionedRectangle({
    x: 10,
    y: 10,
    width: 10,
    height: 20,
  });

  const r2 = initShapePositionedRectangle({
    x: -5,
    y: 5,
    width: 10,
    height: 20,
  });

  const r3 = initShapePositionedRectangle({
    x: 0,
    y: 0,
    width: 10,
    height: 20,
  });

  const intersectionR1R2 = hasInteractionRectangleRectangle(r1, r2);
  t.false(
    intersectionR1R2,
    'Rectangle1 and Rectangle2 must not have an intersection'
  );

  const intersectionR2R3 = hasInteractionRectangleRectangle(r2, r3);
  t.true(intersectionR2R3, 'Rectangle2 and Rectangle3 must to intersect');

  const intersectionR1R3 = hasInteractionRectangleRectangle(r1, r3);
  t.true(intersectionR1R3, 'Rectangle1 and Rectangle3 must to intersect');
});
