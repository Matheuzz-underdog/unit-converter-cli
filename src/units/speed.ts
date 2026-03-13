import { CategoryRegistry, CategoryConfig } from '../types.js';

export const speedRegistry: CategoryRegistry = {
  'm/s': { symbol: 'm/s', name: 'meters per second', toBase: 1 },
  'km/h': { symbol: 'km/h', name: 'kilometers per hour', toBase: 0.277778 },
  mph: { symbol: 'mph', name: 'miles per hour', toBase: 0.44704 },
  knots: { symbol: 'kn', name: 'knots', toBase: 0.514444 },
};

export const speedCategory: CategoryConfig = {
  name: 'speed',
  baseUnit: 'm/s',
  registry: speedRegistry,
};
