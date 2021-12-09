import { pick } from 'remeda';

import { WithPoint, WithVelocity } from '../physics';

import { Entity, EntityId, initEntity } from './Entity';

export const pickPosition = pick<WithPoint, keyof WithPoint>(['position']);
export const pickVelocity = pick<WithVelocity, keyof WithVelocity>([
  'velocity',
]);

export function createEntityFactory(
  idGenerator: () => EntityId
): (entity: Omit<Partial<Entity>, 'id'>) => Entity {
  return (entity) =>
    initEntity({
      ...entity,
      id: idGenerator(),
    });
}
