import { describe, it, expect } from 'vitest';
import { Validator } from '../../src/core/Validator.js';
import { ValidationError, InvalidUnitError, CategoryMismatchError } from '../../src/errors.js';

describe('Validator', () => {
  const validator = new Validator();

  describe('validateNumericValue', () => {
    it('should parse valid numbers', () => {
      expect(validator.validateNumericValue('100')).toBe(100);
      expect(validator.validateNumericValue('3.14')).toBe(3.14);
      expect(validator.validateNumericValue('-40')).toBe(-40);
    });

    it('should throw on invalid numbers', () => {
      expect(() => validator.validateNumericValue('abc')).toThrow(ValidationError);
      expect(() => validator.validateNumericValue('')).toThrow(ValidationError);
    });
  });

  describe('validateUnits', () => {
    it('should pass for valid units', () => {
      expect(() => validator.validateUnits('km', 'mi')).not.toThrow();
      expect(() => validator.validateUnits('kg', 'lb')).not.toThrow();
    });

    it('should throw for invalid units', () => {
      expect(() => validator.validateUnits('xyz', 'mi')).toThrow(InvalidUnitError);
      expect(() => validator.validateUnits('km', 'xyz')).toThrow(InvalidUnitError);
    });
  });

  describe('validateCategoryMatch', () => {
    it('should pass for matching categories', () => {
      expect(validator.validateCategoryMatch('km', 'mi')).toBe('length');
      expect(validator.validateCategoryMatch('kg', 'lb')).toBe('weight');
    });

    it('should throw for mismatched categories', () => {
      expect(() => validator.validateCategoryMatch('km', 'kg')).toThrow(CategoryMismatchError);
    });
  });

  describe('validatePrecision', () => {
    it('should return default precision when not provided', () => {
      expect(validator.validatePrecision(undefined)).toBe(2);
    });

    it('should parse valid precision values', () => {
      expect(validator.validatePrecision('0')).toBe(0);
      expect(validator.validatePrecision('5')).toBe(5);
      expect(validator.validatePrecision('10')).toBe(10);
    });

    it('should throw for invalid precision values', () => {
      expect(() => validator.validatePrecision('-1')).toThrow(ValidationError);
      expect(() => validator.validatePrecision('abc')).toThrow(ValidationError);
    });
  });
});
