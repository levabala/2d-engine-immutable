import { elapseEntity, Entity } from './entity';

export type Scene = {
  /**
   * scene entities array
   */
  readonly entities: readonly Entity[];
  /**
   * current timestamp in ms
   */
  readonly timestamp: number;
};

export function initScene({
  entities = [],
  timestamp = 0,
}: Partial<Scene>): Scene {
  return { entities, timestamp };
}

export function addEntityToScene(
  scene: Scene,
  entities: readonly Entity[]
): Scene {
  return {
    ...scene,
    entities: [...scene.entities, ...entities],
  };
}

export function removeEntityFromScene(
  scene: Scene,
  entityIds: readonly string[]
): Scene {
  return {
    ...scene,
    entities: scene.entities.filter((entity) => !entityIds.includes(entity.id)),
  };
}

/**
 * moves the scene through the time
 * @param scene scene to elapse
 * @param duration duration in ms to elapse
 * @returns scene with entities and timestamp elapsed
 */
export function elapseScene(scene: Scene, duration: number): Scene {
  return {
    ...scene,
    entities: scene.entities.map((entity) => elapseEntity(entity, duration)), // TODO: migrate to data-last
    timestamp: scene.timestamp + duration,
  };
}
