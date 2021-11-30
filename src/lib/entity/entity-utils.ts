import { pick } from 'remeda';

import { Coordinate, Velocity } from '../physics';

export const pickCoordinates = pick<Coordinate, keyof Coordinate>(['x', 'y']);
export const pickVelocity = pick<Velocity, keyof Velocity>(['vx', 'vy']);
