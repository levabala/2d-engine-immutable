import test from 'ava';

import { initShapeCircle, initShapeRectangle } from './Shape-utils';

test('init areas', (t) => {
  const areaCircle = initShapeCircle({ radius: 3 });
  const areaRect = initShapeRectangle({ width: 10, height: 20 });

  t.deepEqual(
    areaCircle,
    { kind: 'Circle', radius: 3 },
    'Invalid area circle initialization'
  );
  t.deepEqual(
    areaRect,
    { kind: 'Rectangle', width: 10, height: 20 },
    'Invalid area rectangle initialization'
  );
});
