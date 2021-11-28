export type Entity = {
  readonly id: string;
  readonly x: number;
  readonly y: number;
};

// not fp..
export function createEntityFactory(
  idGenerator: () => string
): (entity: Omit<Entity, 'id'>) => Entity {
  return (entity) => ({
    ...entity,
    id: idGenerator(),
  });
}
