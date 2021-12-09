import { pick } from 'remeda';

import { Point, Velocity } from '../physics';

import { Entity, EntityId, initEntity } from './Entity';

// TODO: universal picker for vector?
export const pickPosition = pick<Point, keyof Point>(['x', 'y']);
export const pickVelocity = pick<Velocity, keyof Velocity>(['vx', 'vy']);

export function createEntityFactory(
  idGenerator: () => EntityId
): (entity: Omit<Partial<Entity>, 'id'>) => Entity {
  return (entity) =>
    initEntity({
      ...entity,
      id: idGenerator(),
    });
}
