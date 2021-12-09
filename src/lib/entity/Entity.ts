import { Identified, OpaqueString } from '../common';
import { POINT_ZERO, WithPoint, WithVelocity } from '../physics';
import { VECTOR_ZERO } from '../physics/Vector';

export type ENTITY_ID_SYMBOL = 'EntityId';
export type EntityId = OpaqueString<ENTITY_ID_SYMBOL>;
export function EntityId(id: string): EntityId {
  return id as unknown as EntityId;
}

export type Entity = Identified<ENTITY_ID_SYMBOL> & WithPoint & WithVelocity;

export function initEntity({
  id = EntityId(''),
  position = POINT_ZERO,
  velocity = VECTOR_ZERO,
}: Partial<Entity>): Entity {
  return { id, position, velocity };
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
    position: {
      x: entity.position.x + entity.velocity.dx * duration,
      y: entity.position.y + entity.velocity.dy * duration,
    },
  };
}
