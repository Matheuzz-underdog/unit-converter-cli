import { CategoryRegistry, CategoryConfig } from '../types.js';

// Temperature uses special formulas, not simple multiplication factors
// These are placeholder values - actual conversion is handled in Converter
export const temperatureRegistry: CategoryRegistry = {
  c: { symbol: 'c', name: 'celsius', toBase: 1 },
  f: { symbol: 'f', name: 'fahrenheit', toBase: 1 },
  k: { symbol: 'k', name: 'kelvin', toBase: 1 },
};

export const temperatureCategory: CategoryConfig = {
  name: 'temperature',
  baseUnit: 'C',
  registry: temperatureRegistry,
};

// Temperature conversion formulas
export type TemperatureUnit = 'c' | 'f' | 'k';

export function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit
): number {
  if (from === to) return value;

  // Convert to Celsius first
  let celsius: number;
  switch (from) {
    case 'c':
      celsius = value;
      break;
    case 'f':
      celsius = (value - 32) * (5 / 9);
      break;
    case 'k':
      celsius = value - 273.15;
      break;
  }

  // Convert from Celsius to target
  switch (to) {
    case 'c':
      return celsius;
    case 'f':
      return celsius * (9 / 5) + 32;
    case 'k':
      return celsius + 273.15;
  }
}

export function getTemperatureFormula(
  from: TemperatureUnit,
  to: TemperatureUnit
): string {
  if (from === to) return 'No conversion needed';

  const formulas: Record<string, string> = {
    'c-f': '(°C × 9/5) + 32',
    'c-k': '°C + 273.15',
    'f-c': '(°F - 32) × 5/9',
    'f-k': '(°F - 32) × 5/9 + 273.15',
    'k-c': 'K - 273.15',
    'k-f': '(K - 273.15) × 9/5 + 32',
  };

  return formulas[`${from}-${to}`] || '';
}
