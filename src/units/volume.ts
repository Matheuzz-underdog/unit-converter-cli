import { CategoryRegistry, CategoryConfig } from '../types.js';

export const volumeRegistry: CategoryRegistry = {
  l: { symbol: 'l', name: 'liter', toBase: 1 },
  ml: { symbol: 'ml', name: 'milliliter', toBase: 0.001 },
  gal: { symbol: 'gal', name: 'gallon', toBase: 3.78541 },
  qt: { symbol: 'qt', name: 'quart', toBase: 0.946353 },
  pt: { symbol: 'pt', name: 'pint', toBase: 0.473176 },
  cup: { symbol: 'cup', name: 'cup', toBase: 0.236588 },
  'fl oz': { symbol: 'fl oz', name: 'fluid ounce', toBase: 0.0295735 },
};

export const volumeCategory: CategoryConfig = {
  name: 'volume',
  baseUnit: 'L',
  registry: volumeRegistry,
};
