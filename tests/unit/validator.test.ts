import { describe, it, expect } from 'vitest';
import { Validator } from '../../src/core/Validator.js';

describe('Validator', () => {
  const validator = new Validator();

  describe('validateNumericValue', () => {
    it('should accept valid numbers', () => {
      expect(validator.validateNumericValue('5')).toBe(5);
      expect(validator.validateNumericValue('0')).toBe(0);
      expect(validator.validateNumericValue('-10')).toBe(-10);
      expect(validator.validateNumericValue('3.14')).toBe(3.14);
    });

    it('should reject invalid numbers', () => {
      expect(() => validator.validateNumericValue('abc')).toThrow();
      expect(() => validator.validateNumericValue('')).toThrow();
    });
  });

  describe('validatePrecision', () => {
    it('should accept valid precision values', () => {
      expect(validator.validatePrecision('0')).toBe(0);
      expect(validator.validatePrecision('2')).toBe(2);
      expect(validator.validatePrecision('10')).toBe(10);
    });

    it('should reject invalid precision values', () => {
      expect(() => validator.validatePrecision('-1')).toThrow();
      expect(() => validator.validatePrecision('abc')).toThrow();
    });
  });

  describe('validateUnits', () => {
    it('should accept valid unit pairs', () => {
      expect(() => validator.validateUnits('kg', 'lb')).not.toThrow();
      expect(() => validator.validateUnits('m', 'km')).not.toThrow();
      expect(() => validator.validateUnits('c', 'f')).not.toThrow();
    });

    it('should throw for invalid units', () => {
      expect(() => validator.validateUnits('xyz', 'kg')).toThrow();
      expect(() => validator.validateUnits('kg', 'xyz')).toThrow();
    });
  });

  describe('validateCategoryMatch', () => {
    it('should accept same category units', () => {
      expect(() => validator.validateCategoryMatch('kg', 'lb')).not.toThrow();
      expect(() => validator.validateCategoryMatch('m', 'km')).not.toThrow();
    });

    it('should throw for different category units', () => {
      expect(() => validator.validateCategoryMatch('c', 'kg')).toThrow();
      expect(() => validator.validateCategoryMatch('kg', 'm')).toThrow();
    });
  });
});
