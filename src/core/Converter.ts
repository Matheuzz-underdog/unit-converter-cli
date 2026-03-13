import {
  Category,
  ConversionOptions,
  ConversionResult,
} from '../types.js';
import {
  allRegistries,
  getCategoryForUnit,
} from '../units/index.js';
import { convertTemperature, getTemperatureFormula } from '../units/temperature.js';
import { InvalidUnitError, CategoryMismatchError } from '../errors.js';

export class Converter {
  /**
   * Convert a value from one unit to another
   */
  convert(
    value: number,
    fromUnit: string,
    toUnit: string,
    options: ConversionOptions = { precision: 2, verbose: false }
  ): ConversionResult {
    // Normalize unit symbols
    const normalizedFrom = this.normalizeUnit(fromUnit);
    const normalizedTo = this.normalizeUnit(toUnit);

    // Get categories for both units
    const fromCategory = this.getCategoryForUnit(normalizedFrom);
    const toCategory = this.getCategoryForUnit(normalizedTo);

    // Validate units exist
    if (!fromCategory) {
      throw new InvalidUnitError(fromUnit);
    }
    if (!toCategory) {
      throw new InvalidUnitError(toUnit);
    }

    // Validate categories match
    if (fromCategory !== toCategory) {
      throw new CategoryMismatchError(
        fromUnit,
        toUnit,
        fromCategory,
        toCategory
      );
    }

    const category = fromCategory as Category;

    // Handle temperature specially (uses formulas, not factors)
    if (category === 'temperature') {
      return this.convertTemperatureValue(
        value,
        normalizedFrom,
        normalizedTo,
        category,
        options
      );
    }

    // Standard conversion via base unit
    return this.convertStandardValue(
      value,
      normalizedFrom,
      normalizedTo,
      category,
      options
    );
  }

  /**
   * Get category for a unit symbol
   */
  getCategoryForUnit(symbol: string): Category | null {
    return getCategoryForUnit(symbol);
  }

  /**
   * Check if two units are in the same category
   */
  areCompatibleUnits(unit1: string, unit2: string): boolean {
    const cat1 = this.getCategoryForUnit(unit1);
    const cat2 = this.getCategoryForUnit(unit2);
    return cat1 !== null && cat1 === cat2;
  }

  /**
   * Normalize unit symbol (handle case sensitivity)
   */
  private normalizeUnit(symbol: string): string {
    return symbol.toLowerCase();
  }

  /**
   * Standard conversion via base unit (non-temperature)
   */
  private convertStandardValue(
    value: number,
    fromUnit: string,
    toUnit: string,
    category: Category,
    options: ConversionOptions
  ): ConversionResult {
    const registry = allRegistries[category];
    const fromDef = registry[fromUnit];
    const toDef = registry[toUnit];

    if (!fromDef || !toDef) {
      throw new InvalidUnitError(!fromDef ? fromUnit : toUnit);
    }

    // Convert to base unit, then to target unit
    const baseValue = value * fromDef.toBase;
    const result = baseValue / toDef.toBase;

    const formula = options.verbose
      ? `${value} ${fromUnit} → ${baseValue} (base) → ${result} ${toUnit}`
      : undefined;

    return {
      value: result,
      fromUnit,
      toUnit,
      category,
      formula,
    };
  }

  /**
   * Temperature conversion using formulas
   */
  private convertTemperatureValue(
    value: number,
    fromUnit: string,
    toUnit: string,
    category: Category,
    options: ConversionOptions
  ): ConversionResult {
    // Map normalized units to temperature units
    const tempFrom = fromUnit === 'c' ? 'c' : fromUnit === 'f' ? 'f' : 'k';
    const tempTo = toUnit === 'c' ? 'c' : toUnit === 'f' ? 'f' : 'k';

    const result = convertTemperature(value, tempFrom, tempTo);

    const formula = options.verbose
      ? `${getTemperatureFormula(tempFrom, tempTo)}`
      : undefined;

    return {
      value: result,
      fromUnit,
      toUnit,
      category,
      formula,
    };
  }
}
