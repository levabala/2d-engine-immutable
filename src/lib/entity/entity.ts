import { Identified, OpaqueString } from '../common';

export type Coordinate = {
  /**
   * X axis coordinate
   */
  readonly x: number;
  /**
   * Y axis coordinate
   */
  readonly y: number;
};

export type Velocity = {
  /**
   * velocity by X axis
   */
  readonly vx: number;
  /**
   * velocity by Y axis
   */
  readonly vy: number;
};

export type ENTITY_ID_SYMBOL = 'EntityId';
export type EntityId = OpaqueString<ENTITY_ID_SYMBOL>;
export function EntityId(id: string): EntityId {
  return id as unknown as EntityId;
}

export type Entity = Identified<ENTITY_ID_SYMBOL> & Coordinate & Velocity;

export function initEntity({
  id = EntityId(''),
  x = 0,
  y = 0,
  vx = 0,
  vy = 0,
}: Partial<Entity>): Entity {
  return { id, x, y, vx, vy };
}

// not fp..
export function createEntityFactory(
  idGenerator: () => EntityId
): (entity: Omit<Partial<Entity>, 'id'>) => Entity {
  return (entity) =>
    initEntity({
      ...entity,
      id: idGenerator(),
    });
}

/**
 * moves the entity through the time
 * @param entity entity to elapse
 * @param duration duration in ms to elapse
 * @returns entity with updated coordinates due to the velocity by the duration
 */
export function elapseEntity(entity: Entity, duration: number): Entity {
  return {
    ...entity,
    x: entity.x + entity.vx * duration,
    y: entity.y + entity.vy * duration,
  };
}
