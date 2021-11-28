import test from 'ava';
import { pick } from 'remeda';

import { elapseEntity, Entity, initEntity } from './entity';

const pickCoords = pick<Entity, 'x' | 'y'>(['x', 'y']); // TODO: move to entity/utils
const pickVelocity = pick<Entity, 'vx' | 'vy'>(['vx', 'vy']); // TODO: move to entity/utils

const ENTITY_VELOCITY_WAS_CHANGES_MESSAGE = 'entity velocity was changed';

test('elapse entity zero without velocity', (t) => {
  const entityBefore = initEntity({});
  const entityAfter = elapseEntity(entityBefore, 100);

  t.deepEqual(
    pickCoords(entityAfter),
    pickCoords(entityBefore),
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
    pickCoords(entityAfter),
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
    pickCoords(entityAfter),
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
