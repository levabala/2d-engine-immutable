import test from 'ava';

import { elapseEntity, initEntity } from './Entity';
import { pickPosition, pickVelocity } from './Entity.utils';

const ENTITY_VELOCITY_WAS_CHANGES_MESSAGE = 'entity velocity was changed';

test('pick utils', (t) => {
  const entity = initEntity({ x: 1, y: 2, vx: 3, vy: 4 });

  t.deepEqual(pickPosition(entity), { x: 1, y: 2 });
  t.deepEqual(pickVelocity(entity), { vx: 3, vy: 4 });
});

test('elapse entity zero without velocity', (t) => {
  const entityBefore = initEntity({});
  const entityAfter = elapseEntity(entityBefore, 100);

  t.deepEqual(
    pickPosition(entityAfter),
    pickPosition(entityBefore),
    'entity coordinates was changed'
  );

  t.deepEqual(
    pickVelocity(entityAfter),
    pickVelocity(entityBefore),
    ENTITY_VELOCITY_WAS_CHANGES_MESSAGE
  );
});

test('elapse entity zero with velocity', (t) => {
  const entityBefore = initEntity({ vx: 10, vy: 5 });
  const entityAfter = elapseEntity(entityBefore, 100);

  t.deepEqual(
    pickPosition(entityAfter),
    {
      x: 1000,
      y: 500,
    },
    'entity coordinates was changed incorrectly'
  );

  t.deepEqual(
    pickVelocity(entityAfter),
    pickVelocity(entityBefore),
    ENTITY_VELOCITY_WAS_CHANGES_MESSAGE
  );
});

test('elapse entity non-zero with velocity', (t) => {
  const entityBefore = initEntity({ x: 5, y: -5, vx: 10, vy: 5 });
  const entityAfter = elapseEntity(entityBefore, 100);

  t.deepEqual(
    pickPosition(entityAfter),
    {
      x: 1005,
      y: 495,
    },
    'entity coordinates was changed incorrectly'
  );

  t.deepEqual(
    pickVelocity(entityAfter),
    pickVelocity(entityBefore),
    ENTITY_VELOCITY_WAS_CHANGES_MESSAGE
  );
});
