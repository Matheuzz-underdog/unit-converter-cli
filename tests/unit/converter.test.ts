import { describe, it, expect } from 'vitest';
import { Converter } from '../../src/core/Converter.js';

describe('Converter', () => {
  const converter = new Converter();

  describe('Weight conversions', () => {
    it('should convert kg to lb', () => {
      const result = converter.convert(5, 'kg', 'lb');
      expect(result.value).toBeCloseTo(11.02, 1);
    });

    it('should convert lb to kg', () => {
      const result = converter.convert(10, 'lb', 'kg');
      expect(result.value).toBeCloseTo(4.54, 1);
    });

    it('should convert g to oz', () => {
      const result = converter.convert(100, 'g', 'oz');
      expect(result.value).toBeCloseTo(3.53, 1);
    });
  });

  describe('Length conversions', () => {
    it('should convert km to m', () => {
      const result = converter.convert(1, 'km', 'm');
      expect(result.value).toBe(1000);
    });

    it('should convert mi to km', () => {
      const result = converter.convert(1, 'mi', 'km');
      expect(result.value).toBeCloseTo(1.61, 1);
    });

    it('should convert ft to in', () => {
      const result = converter.convert(1, 'ft', 'in');
      expect(result.value).toBeCloseTo(12, 1);
    });
  });

  describe('Temperature conversions', () => {
    it('should convert celsius to fahrenheit', () => {
      const result = converter.convert(100, 'c', 'f');
      expect(result.value).toBe(212);
    });

    it('should convert fahrenheit to celsius', () => {
      const result = converter.convert(32, 'f', 'c');
      expect(result.value).toBe(0);
    });

    it('should convert celsius to kelvin', () => {
      const result = converter.convert(0, 'c', 'k');
      expect(result.value).toBeCloseTo(273.15, 1);
    });
  });

  describe('Volume conversions', () => {
    it('should convert l to ml', () => {
      const result = converter.convert(1, 'l', 'ml');
      expect(result.value).toBe(1000);
    });

    it('should convert gal to l', () => {
      const result = converter.convert(1, 'gal', 'l');
      expect(result.value).toBeCloseTo(3.79, 1);
    });
  });

  describe('Area conversions', () => {
    it('should convert m2 to ft2', () => {
      const result = converter.convert(1, 'm2', 'ft2');
      expect(result.value).toBeCloseTo(10.76, 1);
    });

    it('should convert acre to ha', () => {
      const result = converter.convert(1, 'acre', 'ha');
      expect(result.value).toBeCloseTo(0.40, 1);
    });
  });

  describe('Time conversions', () => {
    it('should convert h to min', () => {
      const result = converter.convert(1, 'h', 'min');
      expect(result.value).toBe(60);
    });

    it('should convert day to h', () => {
      const result = converter.convert(1, 'day', 'h');
      expect(result.value).toBe(24);
    });
  });

  describe('Speed conversions', () => {
    it('should convert km/h to mph', () => {
      const result = converter.convert(100, 'km/h', 'mph');
      expect(result.value).toBeCloseTo(62.14, 1);
    });

    it('should convert knots to m/s', () => {
      const result = converter.convert(1, 'knots', 'm/s');
      expect(result.value).toBeCloseTo(0.51, 1);
    });
  });

  describe('Data conversions', () => {
    it('should convert mb to kb', () => {
      const result = converter.convert(1, 'mb', 'kb');
      expect(result.value).toBeCloseTo(1024, 0);
    });

    it('should convert gb to mb', () => {
      const result = converter.convert(1, 'gb', 'mb');
      expect(result.value).toBeCloseTo(1024, 0);
    });
  });

  describe('Category validation', () => {
    it('should throw error for category mismatch', () => {
      expect(() => converter.convert(100, 'c', 'kg')).toThrow();
    });

    it('should throw error for invalid unit', () => {
      expect(() => converter.convert(100, 'xyz', 'kg')).toThrow();
    });
  });

  describe('Precision option', () => {
    it('should respect precision option', () => {
      const result = converter.convert(10, 'kg', 'lb', { precision: 4, verbose: false });
      expect(result.value.toString()).toContain('.');
    });
  });

  describe('Verbose option', () => {
    it('should include formula in verbose mode', () => {
      const result = converter.convert(100, 'c', 'f', { precision: 2, verbose: true });
      expect(result.formula).toBeDefined();
    });
  });
});
