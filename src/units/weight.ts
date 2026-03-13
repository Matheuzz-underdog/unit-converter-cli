import { CategoryRegistry, CategoryConfig } from '../types.js';

export const weightRegistry: CategoryRegistry = {
  kg: { symbol: 'kg', name: 'kilogram', toBase: 1 },
  g: { symbol: 'g', name: 'gram', toBase: 0.001 },
  lb: { symbol: 'lb', name: 'pound', toBase: 0.453592 },
  oz: { symbol: 'oz', name: 'ounce', toBase: 0.0283495 },
  ton: { symbol: 'ton', name: 'metric ton', toBase: 1000 },
};

export const weightCategory: CategoryConfig = {
  name: 'weight',
  baseUnit: 'kg',
  registry: weightRegistry,
};
