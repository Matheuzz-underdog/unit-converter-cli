import { describe, it, expect } from 'vitest';
import { allRegistries, getCategoryForUnit, allCategories } from '../../src/units/index.js';

describe('Unit Registries', () => {
  describe('Length', () => {
    const registry = allRegistries.length;

    it('should have all required units', () => {
      expect(registry.km).toBeDefined();
      expect(registry.m).toBeDefined();
      expect(registry.cm).toBeDefined();
      expect(registry.mm).toBeDefined();
      expect(registry.mi).toBeDefined();
      expect(registry.yd).toBeDefined();
      expect(registry.ft).toBeDefined();
      expect(registry.in).toBeDefined();
    });

    it('should have correct conversion factors', () => {
      expect(registry.km.toBase).toBe(1000);
      expect(registry.m.toBase).toBe(1);
      expect(registry.cm.toBase).toBe(0.01);
    });
  });

  describe('Weight', () => {
    const registry = allRegistries.weight;

    it('should have all required units', () => {
      expect(registry.kg).toBeDefined();
      expect(registry.g).toBeDefined();
      expect(registry.lb).toBeDefined();
      expect(registry.oz).toBeDefined();
      expect(registry.ton).toBeDefined();
    });
  });

  describe('Temperature', () => {
    const registry = allRegistries.temperature;

    it('should have all required units', () => {
      expect(registry.c).toBeDefined();
      expect(registry.f).toBeDefined();
      expect(registry.k).toBeDefined();
    });
  });

  describe('Volume', () => {
    const registry = allRegistries.volume;

    it('should have all required units', () => {
      expect(registry.l).toBeDefined();
      expect(registry.ml).toBeDefined();
      expect(registry.gal).toBeDefined();
      expect(registry.qt).toBeDefined();
      expect(registry.pt).toBeDefined();
      expect(registry.cup).toBeDefined();
      expect(registry['fl oz']).toBeDefined();
    });
  });

  describe('Area', () => {
    const registry = allRegistries.area;

    it('should have all required units', () => {
      expect(registry.m2).toBeDefined();
      expect(registry.km2).toBeDefined();
      expect(registry.mi2).toBeDefined();
      expect(registry.ft2).toBeDefined();
      expect(registry.acre).toBeDefined();
      expect(registry.ha).toBeDefined();
    });
  });

  describe('Time', () => {
    const registry = allRegistries.time;

    it('should have all required units', () => {
      expect(registry.s).toBeDefined();
      expect(registry.min).toBeDefined();
      expect(registry.h).toBeDefined();
      expect(registry.day).toBeDefined();
      expect(registry.week).toBeDefined();
    });
  });

  describe('Speed', () => {
    const registry = allRegistries.speed;

    it('should have all required units', () => {
      expect(registry['m/s']).toBeDefined();
      expect(registry['km/h']).toBeDefined();
      expect(registry.mph).toBeDefined();
      expect(registry.knots).toBeDefined();
    });
  });

  describe('Data', () => {
    const registry = allRegistries.data;

    it('should have all required units', () => {
      expect(registry.b).toBeDefined();
      expect(registry.kb).toBeDefined();
      expect(registry.mb).toBeDefined();
      expect(registry.gb).toBeDefined();
      expect(registry.tb).toBeDefined();
      expect(registry.pb).toBeDefined();
    });
  });

  describe('getCategoryForUnit', () => {
    it('should return correct category for each unit', () => {
      expect(getCategoryForUnit('km')).toBe('length');
      expect(getCategoryForUnit('kg')).toBe('weight');
      expect(getCategoryForUnit('c')).toBe('temperature');
      expect(getCategoryForUnit('l')).toBe('volume');
      expect(getCategoryForUnit('m2')).toBe('area');
      expect(getCategoryForUnit('s')).toBe('time');
      expect(getCategoryForUnit('km/h')).toBe('speed');
      expect(getCategoryForUnit('kb')).toBe('data');
    });

    it('should return null for unknown units', () => {
      expect(getCategoryForUnit('xyz')).toBeNull();
    });
  });

  describe('Categories', () => {
    it('should have 8 categories', () => {
      expect(allCategories).toHaveLength(8);
    });

    it('should have correct base units', () => {
      const lengthCat = allCategories.find(c => c.name === 'length');
      expect(lengthCat?.baseUnit).toBe('m');

      const weightCat = allCategories.find(c => c.name === 'weight');
      expect(weightCat?.baseUnit).toBe('kg');

      const tempCat = allCategories.find(c => c.name === 'temperature');
      expect(tempCat?.baseUnit).toBe('C');
    });
  });
});
