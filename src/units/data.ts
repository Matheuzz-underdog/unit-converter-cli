import { CategoryRegistry, CategoryConfig } from '../types.js';

export const dataRegistry: CategoryRegistry = {
  b: { symbol: 'b', name: 'byte', toBase: 1 },
  kb: { symbol: 'kb', name: 'kilobyte', toBase: 1024 },
  mb: { symbol: 'mb', name: 'megabyte', toBase: 1048576 },
  gb: { symbol: 'gb', name: 'gigabyte', toBase: 1073741824 },
  tb: { symbol: 'tb', name: 'terabyte', toBase: 1099511627776 },
  pb: { symbol: 'pb', name: 'petabyte', toBase: 1125899906842624 },
};

export const dataCategory: CategoryConfig = {
  name: 'data',
  baseUnit: 'B',
  registry: dataRegistry,
};
