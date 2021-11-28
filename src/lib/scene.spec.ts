import test from 'ava';

import { createEntityFactory } from './entity';
import { addEntityToScene, Scene } from './scene';

test('scene add entities', (t) => {
  let i = 0;
  const createEntity = createEntityFactory(() => (i++).toString());

  const entity1 = createEntity({
    x: 10,
    y: 20,
  });
  const entity2 = createEntity({
    x: 13,
    y: 23,
  });

  const sceneBefore: Scene = {
    entities: [entity1],
  };

  const sceneAfter = addEntityToScene(sceneBefore, [entity2]);

  // immutable
  t.deepEqual(
    sceneBefore,
    { entities: [entity1] },
    'initial scene was changed'
  );

  // with a new entity
  t.deepEqual(
    sceneAfter,
    { entities: [entity1, entity2] },
    'one entity adding failed'
  );
});
