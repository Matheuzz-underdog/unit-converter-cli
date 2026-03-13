// Supported unit categories
export type Category =
  | 'length'
  | 'weight'
  | 'temperature'
  | 'volume'
  | 'area'
  | 'time'
  | 'speed'
  | 'data';

// Unit definition with conversion factor to base unit
export interface UnitDefinition {
  symbol: string;
  name: string;
  toBase: number;
  fromBase?: number;
}

// Category registry mapping unit symbols to definitions
export type CategoryRegistry = Record<string, UnitDefinition>;

// Conversion options from CLI flags
export interface ConversionOptions {
  precision: number;
  verbose: boolean;
}

// Result of a conversion
export interface ConversionResult {
  value: number;
  fromUnit: string;
  toUnit: string;
  category: Category;
  formula?: string;
}

// List output format
export interface CategoryInfo {
  name: Category;
  baseUnit: string;
  units: UnitDefinition[];
}

// All categories configuration
export interface CategoryConfig {
  name: Category;
  baseUnit: string;
  registry: CategoryRegistry;
}