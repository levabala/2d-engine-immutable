import { Entity } from './entity';

export type Scene = {
  readonly entities: readonly Entity[];
};

export function addEntityToScene(
  scene: Scene,
  entities: readonly Entity[]
): Scene {
  return {
    entities: [...scene.entities, ...entities],
  };
}

export function removeEntityFromScene(
  scene: Scene,
  entityIds: readonly string[]
): Scene {
  return {
    entities: scene.entities.filter((entity) => !entityIds.includes(entity.id)),
  };
}
