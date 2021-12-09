import { pick } from 'remeda';

import { WithPoint, WithVelocity } from '../physics';

export const pickPosition = pick<WithPoint, keyof WithPoint>(['position']);
export const pickVelocity = pick<WithVelocity, keyof WithVelocity>([
  'velocity',
]);
