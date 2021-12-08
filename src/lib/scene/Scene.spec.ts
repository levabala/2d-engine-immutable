import test from 'ava';

import {
  createEntityFactory,
  EntityId,
  initEntity,
  pickCoordinates,
  pickVelocity,
} from '../entity';

import {
  addEntityToScene,
  elapseScene,
  initScene,
  removeEntityFromScene,
} from './Scene';

function defaultEntityFactory() {
  let i = 0;
  return createEntityFactory(() => EntityId((i++).toString()));
}

test('scene init', (t) => {
  const sceneEmpty = initScene({});
  const sceneFilled = initScene({ entities: [initEntity({})], timestamp: 123 });

  t.deepEqual(sceneEmpty, { entities: [], timestamp: 0 });
  t.deepEqual(sceneFilled, { entities: [initEntity({})], timestamp: 123 });
});

test('scene add entities', (t) => {
  const createEntity = defaultEntityFactory();

  const entity1 = createEntity({
    x: 10,
    y: 20,
    vx: 0,
    vy: 0,
  });
  const entity2 = createEntity({
    x: 13,
    y: 23,
    vx: 0,
    vy: 0,
  });

  const sceneBefore = initScene({
    entities: [entity1],
  });
  const sceneAfter = addEntityToScene(sceneBefore, [entity2]);

  // immutable
  t.deepEqual(sceneBefore.entities, [entity1], 'initial scene was changed');

  // with a new entity
  t.deepEqual(
    sceneAfter.entities,
    [entity1, entity2],
    'one entity addition failed'
  );
});

test('scene remove entities', (t) => {
  const entity1 = initEntity({
    id: EntityId('the first one'),
    x: 10,
    y: 20,
    vx: 0,
    vy: 0,
  });
  const entity2 = initEntity({
    id: EntityId('the second one'),
    x: 13,
    y: 23,
    vx: 0,
    vy: 0,
  });

  const sceneBefore = initScene({
    entities: [entity1, entity2],
  });
  const sceneAfter = removeEntityFromScene(sceneBefore, [
    EntityId('the second one'),
  ]);

  // immutable
  t.deepEqual(
    sceneBefore.entities,
    [entity1, entity2],
    'initial scene was changed'
  );

  // with a new entity
  t.deepEqual(sceneAfter.entities, [entity1], 'entity deletion failed');
});

test('scene elapse', (t) => {
  const createEntity = defaultEntityFactory();

  const entity1 = createEntity({
    x: 10,
    y: 20,
    vx: -5,
    vy: 10,
  });
  const entity2 = createEntity({
    x: 13,
    y: 23,
    vx: 2,
    vy: 2,
  });

  const sceneBefore = initScene({
    entities: [entity1, entity2],
  });
  const sceneAfter = elapseScene(sceneBefore, 100);

  t.deepEqual(
    sceneAfter.timestamp,
    sceneBefore.timestamp + 100,
    'scene timestamp did not update'
  );

  t.deepEqual(
    sceneAfter.entities.map(pickCoordinates),
    [
      {
        x: -490,
        y: 1020,
      },
      {
        x: 213,
        y: 223,
      },
    ],
    `scene entities's coordinates was updated incorrectly`
  );

  t.deepEqual(
    sceneAfter.entities.map(pickVelocity),
    sceneBefore.entities.map(pickVelocity),
    `scene entities's velocities was updated but should not be changed`
  );
});
