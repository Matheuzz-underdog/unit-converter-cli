import { CategoryRegistry, CategoryConfig } from '../types.js';

export const timeRegistry: CategoryRegistry = {
  s: { symbol: 's', name: 'second', toBase: 1 },
  min: { symbol: 'min', name: 'minute', toBase: 60 },
  h: { symbol: 'h', name: 'hour', toBase: 3600 },
  day: { symbol: 'day', name: 'day', toBase: 86400 },
  week: { symbol: 'week', name: 'week', toBase: 604800 },
};

export const timeCategory: CategoryConfig = {
  name: 'time',
  baseUnit: 's',
  registry: timeRegistry,
};
