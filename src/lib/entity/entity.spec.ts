import test from 'ava';

import { elapseEntity, initEntity } from './entity';
import { pickCoordinates, pickVelocity } from './entity.utils';

const ENTITY_VELOCITY_WAS_CHANGES_MESSAGE = 'entity velocity was changed';

test('pick utils', (t) => {
  const entity = initEntity({ x: 1, y: 2, vx: 3, vy: 4 });

  t.deepEqual(pickCoordinates(entity), { x: 1, y: 2 });
  t.deepEqual(pickVelocity(entity), { vx: 3, vy: 4 });
});

test('elapse entity zero without velocity', (t) => {
  const entityBefore = initEntity({});
  const entityAfter = elapseEntity(entityBefore, 100);

  t.deepEqual(
    pickCoordinates(entityAfter),
    pickCoordinates(entityBefore),
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
    pickCoordinates(entityAfter),
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
    pickCoordinates(entityAfter),
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
