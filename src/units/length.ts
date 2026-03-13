import { CategoryRegistry, CategoryConfig } from '../types.js';

export const lengthRegistry: CategoryRegistry = {
  km: { symbol: 'km', name: 'kilometer', toBase: 1000 },
  m: { symbol: 'm', name: 'meter', toBase: 1 },
  cm: { symbol: 'cm', name: 'centimeter', toBase: 0.01 },
  mm: { symbol: 'mm', name: 'millimeter', toBase: 0.001 },
  mi: { symbol: 'mi', name: 'mile', toBase: 1609.344 },
  yd: { symbol: 'yd', name: 'yard', toBase: 0.9144 },
  ft: { symbol: 'ft', name: 'foot', toBase: 0.3048 },
  in: { symbol: 'in', name: 'inch', toBase: 0.0254 },
};

export const lengthCategory: CategoryConfig = {
  name: 'length',
  baseUnit: 'm',
  registry: lengthRegistry,
};
