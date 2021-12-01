import test from 'ava';

import { initShapeCircle, initShapeRectangle } from './Shape.utils';

test('init shapes', (t) => {
  const areaCircle = initShapeCircle({ radius: 3 });
  const areaRect = initShapeRectangle({ width: 10, height: 20 });

  t.deepEqual(
    areaCircle,
    { kind: 'Circle', radius: 3 },
    'Invalid shape circle initialization'
  );
  t.deepEqual(
    areaRect,
    { kind: 'Rectangle', width: 10, height: 20 },
    'Invalid shape rectangle initialization'
  );
});
