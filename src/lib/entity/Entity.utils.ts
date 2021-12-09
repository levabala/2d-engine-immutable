import { pick } from 'remeda';

import { Point, Velocity } from '../physics';

export const pickPoint = pick<Point, keyof Point>(['x', 'y']);
export const pickVelocity = pick<Velocity, keyof Velocity>(['vx', 'vy']);
