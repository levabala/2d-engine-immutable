import { Identified, OpaqueString } from '../common';
import { Point, Velocity } from '../physics';

export type ENTITY_ID_SYMBOL = 'EntityId';
export type EntityId = OpaqueString<ENTITY_ID_SYMBOL>;
export function EntityId(id: string): EntityId {
  return id as unknown as EntityId;
}

export type Entity = Identified<ENTITY_ID_SYMBOL> & Point & Velocity;

export function initEntity({
  id = EntityId(''),
  x = 0,
  y = 0,
  vx = 0,
  vy = 0,
}: Partial<Entity>): Entity {
  return { id, x, y, vx, vy };
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
