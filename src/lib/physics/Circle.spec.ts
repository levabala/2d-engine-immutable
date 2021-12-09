import test from 'ava';

import { CirclePositioned, hasIntersectionCircleCircle } from './Circle';

test('intersection circle-circle', (t) => {
  const c1: CirclePositioned = {
    x: 10,
    y: 10,
    radius: 2,
  };

  const c2: CirclePositioned = {
    x: 3,
    y: 2,
    radius: 3,
  };

  const c3: CirclePositioned = {
    x: 9,
    y: 8,
    radius: 4,
  };

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
