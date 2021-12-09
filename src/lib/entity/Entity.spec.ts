import test from 'ava';

import { elapseEntity, initEntity } from './Entity';

const ENTITY_VELOCITY_WAS_CHANGES_MESSAGE = 'entity velocity was changed';

test('pick utils', (t) => {
  const entity = initEntity({
    position: { x: 1, y: 2 },
    velocity: { dx: 3, dy: 4 },
  });

  t.deepEqual(entity.position, { x: 1, y: 2 });
  t.deepEqual(entity.velocity, { dx: 3, dy: 4 });
});

test('elapse entity zero without velocity', (t) => {
  const entityBefore = initEntity({});
  const entityAfter = elapseEntity(entityBefore, 100);

  t.deepEqual(
    entityAfter.position,
    entityBefore.position,
    'entity coordinates was changed'
  );

  t.deepEqual(
    entityAfter.velocity,
    entityBefore.velocity,
    ENTITY_VELOCITY_WAS_CHANGES_MESSAGE
  );
});

test('elapse entity zero with velocity', (t) => {
  const entityBefore = initEntity({ velocity: { dx: 10, dy: 5 } });
  const entityAfter = elapseEntity(entityBefore, 100);

  t.deepEqual(
    entityAfter.position,
    {
      x: 1000,
      y: 500,
    },
    'entity coordinates was changed incorrectly'
  );

  t.deepEqual(
    entityAfter.velocity,
    entityBefore.velocity,
    ENTITY_VELOCITY_WAS_CHANGES_MESSAGE
  );
});

test('elapse entity non-zero with velocity', (t) => {
  const entityBefore = initEntity({
    position: { x: 5, y: -5 },
    velocity: { dx: 10, dy: 5 },
  });
  const entityAfter = elapseEntity(entityBefore, 100);

  t.deepEqual(
    entityAfter.position,
    {
      x: 1005,
      y: 495,
    },
    'entity coordinates was changed incorrectly'
  );

  t.deepEqual(
    entityAfter.velocity,
    entityBefore.velocity,
    ENTITY_VELOCITY_WAS_CHANGES_MESSAGE
  );
});
