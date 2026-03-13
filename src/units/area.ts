import { CategoryRegistry, CategoryConfig } from '../types.js';

export const areaRegistry: CategoryRegistry = {
  m2: { symbol: 'm2', name: 'square meter', toBase: 1 },
  km2: { symbol: 'km2', name: 'square kilometer', toBase: 1000000 },
  mi2: { symbol: 'mi2', name: 'square mile', toBase: 2589988.11 },
  ft2: { symbol: 'ft2', name: 'square foot', toBase: 0.092903 },
  acre: { symbol: 'acre', name: 'acre', toBase: 4046.86 },
  ha: { symbol: 'ha', name: 'hectare', toBase: 10000 },
};

export const areaCategory: CategoryConfig = {
  name: 'area',
  baseUnit: 'm2',
  registry: areaRegistry,
};
