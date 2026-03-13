import { describe, it, expect } from 'vitest';
import { Converter } from '../../src/core/Converter.js';

describe('Converter', () => {
  const converter = new Converter();

  describe('getCategoryForUnit', () => {
    it('should return correct category for length units', () => {
      expect(converter.getCategoryForUnit('km')).toBe('length');
      expect(converter.getCategoryForUnit('m')).toBe('length');
      expect(converter.getCategoryForUnit('mi')).toBe('length');
    });

    it('should return correct category for weight units', () => {
      expect(converter.getCategoryForUnit('kg')).toBe('weight');
      expect(converter.getCategoryForUnit('lb')).toBe('weight');
    });

    it('should return correct category for temperature units', () => {
      expect(converter.getCategoryForUnit('c')).toBe('temperature');
      expect(converter.getCategoryForUnit('f')).toBe('temperature');
      expect(converter.getCategoryForUnit('k')).toBe('temperature');
    });

    it('should return null for invalid units', () => {
      expect(converter.getCategoryForUnit('xyz')).toBeNull();
    });
  });

  describe('areCompatibleUnits', () => {
    it('should return true for compatible units', () => {
      expect(converter.areCompatibleUnits('km', 'mi')).toBe(true);
      expect(converter.areCompatibleUnits('kg', 'lb')).toBe(true);
    });

    it('should return false for incompatible units', () => {
      expect(converter.areCompatibleUnits('km', 'kg')).toBe(false);
    });
  });

  describe('convert - Length', () => {
    it('should convert kilometers to miles', () => {
      const result = converter.convert(100, 'km', 'mi');
      expect(result.value).toBeCloseTo(62.14, 1);
    });

    it('should convert meters to feet', () => {
      const result = converter.convert(1, 'm', 'ft');
      expect(result.value).toBeCloseTo(3.281, 2);
    });

    it('should convert inches to centimeters', () => {
      const result = converter.convert(1, 'in', 'cm');
      expect(result.value).toBeCloseTo(2.54, 2);
    });
  });

  describe('convert - Weight', () => {
    it('should convert kilograms to pounds', () => {
      const result = converter.convert(1, 'kg', 'lb');
      expect(result.value).toBeCloseTo(2.205, 2);
    });

    it('should convert pounds to grams', () => {
      const result = converter.convert(1, 'lb', 'g');
      expect(result.value).toBeCloseTo(453.59, 1);
    });
  });

  describe('convert - Temperature', () => {
    it('should convert Celsius to Fahrenheit', () => {
      const result = converter.convert(100, 'c', 'f');
      expect(result.value).toBe(212);
    });

    it('should convert Celsius to Fahrenheit (0°C)', () => {
      const result = converter.convert(0, 'c', 'f');
      expect(result.value).toBe(32);
    });

    it('should convert Celsius to Kelvin', () => {
      const result = converter.convert(0, 'c', 'k');
      expect(result.value).toBeCloseTo(273.15, 2);
    });

    it('should convert Fahrenheit to Celsius', () => {
      const result = converter.convert(32, 'f', 'c');
      expect(result.value).toBe(0);
    });

    it('should convert Kelvin to Celsius', () => {
      const result = converter.convert(273.15, 'k', 'c');
      expect(result.value).toBe(0);
    });

    it('should handle negative temperatures', () => {
      const result = converter.convert(-40, 'c', 'f');
      expect(result.value).toBe(-40);
    });
  });

  describe('convert - Volume', () => {
    it('should convert liters to gallons', () => {
      const result = converter.convert(1, 'l', 'gal');
      expect(result.value).toBeCloseTo(0.264, 2);
    });

    it('should convert milliliters to cups', () => {
      const result = converter.convert(100, 'ml', 'cup');
      expect(result.value).toBeCloseTo(0.423, 2);
    });
  });

  describe('convert - Area', () => {
    it('should convert square meters to square feet', () => {
      const result = converter.convert(1, 'm2', 'ft2');
      expect(result.value).toBeCloseTo(10.764, 2);
    });

    it('should convert acres to hectares', () => {
      const result = converter.convert(1, 'acre', 'ha');
      expect(result.value).toBeCloseTo(0.405, 2);
    });
  });

  describe('convert - Time', () => {
    it('should convert hours to seconds', () => {
      const result = converter.convert(1, 'h', 's');
      expect(result.value).toBe(3600);
    });

    it('should convert days to hours', () => {
      const result = converter.convert(1, 'day', 'h');
      expect(result.value).toBe(24);
    });
  });

  describe('convert - Speed', () => {
    it('should convert km/h to mph', () => {
      const result = converter.convert(100, 'km/h', 'mph');
      expect(result.value).toBeCloseTo(62.14, 1);
    });

    it('should convert knots to m/s', () => {
      const result = converter.convert(1, 'knots', 'm/s');
      expect(result.value).toBeCloseTo(0.514, 2);
    });
  });

  describe('convert - Data', () => {
    it('should convert kilobytes to bytes', () => {
      const result = converter.convert(1, 'kb', 'b');
      expect(result.value).toBe(1024);
    });

    it('should convert gigabytes to megabytes', () => {
      const result = converter.convert(1, 'gb', 'mb');
      expect(result.value).toBe(1024);
    });
  });

  describe('convert - Case Insensitivity', () => {
    it('should handle lowercase units', () => {
      const result = converter.convert(100, 'km', 'mi');
      expect(result.value).toBeCloseTo(62.14, 1);
    });

    it('should handle uppercase units', () => {
      const result = converter.convert(100, 'KM', 'MI');
      expect(result.value).toBeCloseTo(62.14, 1);
    });
  });

  describe('convert - Precision', () => {
    it('should apply default precision', () => {
      const result = converter.convert(1, 'km', 'm');
      // Default precision 2 should give 1000
      expect(result.value).toBe(1000);
    });

    it('should apply custom precision', () => {
      const result = converter.convert(1, 'km', 'm', { precision: 5, verbose: false });
      expect(result.value).toBe(1000);
    });
  });

  describe('convert - Bidirectional Consistency', () => {
    it('should be consistent in both directions', () => {
      const result1 = converter.convert(100, 'km', 'mi');
      const result2 = converter.convert(result1.value, 'mi', 'km');
      expect(result2.value).toBeCloseTo(100, 2);
    });
  });
});
