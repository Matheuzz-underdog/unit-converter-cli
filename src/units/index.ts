export { lengthRegistry, lengthCategory } from './length.js';
export { weightRegistry, weightCategory } from './weight.js';
export { temperatureRegistry, temperatureCategory } from './temperature.js';
export { volumeRegistry, volumeCategory } from './volume.js';
export { areaRegistry, areaCategory } from './area.js';
export { timeRegistry, timeCategory } from './time.js';
export { speedRegistry, speedCategory } from './speed.js';
export { dataRegistry, dataCategory } from './data.js';

import { Category, CategoryConfig, CategoryRegistry } from '../types.js';
import { lengthRegistry, lengthCategory } from './length.js';
import { weightRegistry, weightCategory } from './weight.js';
import { temperatureRegistry, temperatureCategory } from './temperature.js';
import { volumeRegistry, volumeCategory } from './volume.js';
import { areaRegistry, areaCategory } from './area.js';
import { timeRegistry, timeCategory } from './time.js';
import { speedRegistry, speedCategory } from './speed.js';
import { dataRegistry, dataCategory } from './data.js';

export const allCategories: CategoryConfig[] = [
  lengthCategory,
  weightCategory,
  temperatureCategory,
  volumeCategory,
  areaCategory,
  timeCategory,
  speedCategory,
  dataCategory,
];

export const allRegistries: Record<Category, CategoryRegistry> = {
  length: lengthRegistry,
  weight: weightRegistry,
  temperature: temperatureRegistry,
  volume: volumeRegistry,
  area: areaRegistry,
  time: timeRegistry,
  speed: speedRegistry,
  data: dataRegistry,
};

export function getCategoryForUnit(symbol: string): Category | null {
  const normalizedSymbol = symbol.toLowerCase();
  for (const [category, registry] of Object.entries(allRegistries)) {
    if (normalizedSymbol in registry) {
      return category as Category;
    }
  }
  return null;
}

export function getUnitFromRegistry(
  category: Category,
  symbol: string
) {
  const registry = allRegistries[category];
  const normalizedSymbol = symbol.toLowerCase();
  return registry[normalizedSymbol] || null;
}
