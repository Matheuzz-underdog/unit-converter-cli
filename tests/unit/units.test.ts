import { describe, it, expect } from 'vitest';
import { convertTemperature, getTemperatureFormula } from '../../src/units/temperature.js';

describe('Temperature', () => {
  describe('convertTemperature', () => {
    it('should convert celsius to fahrenheit', () => {
      expect(convertTemperature(100, 'c', 'f')).toBe(212);
    });

    it('should convert fahrenheit to celsius', () => {
      expect(convertTemperature(32, 'f', 'c')).toBe(0);
    });

    it('should convert celsius to kelvin', () => {
      expect(convertTemperature(0, 'c', 'k')).toBeCloseTo(273.15, 2);
    });

    it('should convert kelvin to celsius', () => {
      expect(convertTemperature(273.15, 'k', 'c')).toBeCloseTo(0, 2);
    });

    it('should return same value for same unit', () => {
      expect(convertTemperature(50, 'c', 'c')).toBe(50);
    });
  });

  describe('getTemperatureFormula', () => {
    it('should return formula for c to f', () => {
      expect(getTemperatureFormula('c', 'f')).toBe('(°C × 9/5) + 32');
    });

    it('should return formula for f to c', () => {
      expect(getTemperatureFormula('f', 'c')).toBe('(°F - 32) × 5/9');
    });

    it('should return no conversion needed for same unit', () => {
      expect(getTemperatureFormula('c', 'c')).toBe('No conversion needed');
    });
  });
});
