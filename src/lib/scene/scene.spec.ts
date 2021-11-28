import test from 'ava';

import { createEntityFactory, pickCoordinates, pickVelocity } from '../entity';

import { addEntityToScene, elapseScene, initScene } from './scene';

function defaultEntityFactory() {
  let i = 0;
  return createEntityFactory(() => (i++).toString());
}

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

  t.log({ createEntityFactory, pickCoordinates, pickVelocity });

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
