import { Category } from './types.js';

export class ConversionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConversionError';
  }
}

export class InvalidUnitError extends ConversionError {
  constructor(unit: string) {
    super(`Unknown unit: "${unit}"`);
    this.name = 'InvalidUnitError';
  }
}

export class CategoryMismatchError extends ConversionError {
  constructor(
    unit1: string,
    unit2: string,
    cat1: Category,
    cat2: Category
  ) {
    super(`Cannot convert between "${cat1}" (${unit1}) and "${cat2}" (${unit2})`);
    this.name = 'CategoryMismatchError';
  }
}

export class ValidationError extends ConversionError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}