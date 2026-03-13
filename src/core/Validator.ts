import { Category } from '../types.js';
import { getCategoryForUnit } from '../units/index.js';
import { ValidationError, InvalidUnitError, CategoryMismatchError } from '../errors.js';

export class Validator {
  /**
   * Validate that the input value is a valid number
   */
  validateNumericValue(value: string): number {
    const num = parseFloat(value);
    if (isNaN(num)) {
      throw new ValidationError(`Invalid numeric value: "${value}". Must be a number.`);
    }
    return num;
  }

  /**
   * Validate that both units exist
   */
  validateUnits(fromUnit: string, toUnit: string): void {
    const fromCategory = getCategoryForUnit(fromUnit);
    const toCategory = getCategoryForUnit(toUnit);

    if (!fromCategory) {
      throw new InvalidUnitError(fromUnit);
    }
    if (!toCategory) {
      throw new InvalidUnitError(toUnit);
    }
  }

  /**
   * Validate that both units are in the same category
   */
  validateCategoryMatch(fromUnit: string, toUnit: string): Category {
    const fromCategory = getCategoryForUnit(fromUnit);
    const toCategory = getCategoryForUnit(toUnit);

    if (!fromCategory || !toCategory) {
      // This should be caught by validateUnits
      throw new ValidationError('Unable to determine unit categories');
    }

    if (fromCategory !== toCategory) {
      throw new CategoryMismatchError(fromUnit, toUnit, fromCategory, toCategory);
    }

    return fromCategory;
  }

  /**
   * Validate precision value
   */
  validatePrecision(precision: string | undefined): number {
    const defaultPrecision = 2;

    if (precision === undefined) {
      return defaultPrecision;
    }

    const num = parseInt(precision, 10);
    
    if (isNaN(num)) {
      throw new ValidationError(`Invalid precision value: "${precision}". Must be an integer.`);
    }

    if (num < 0) {
      throw new ValidationError(`Precision must be non-negative. Got: ${num}`);
    }

    // Warn but don't fail for very large precision
    if (num > 10) {
      console.warn(`Warning: Precision ${num} is very high. Results may be unusual.`);
    }

    return num;
  }
}
