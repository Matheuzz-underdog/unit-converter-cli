import { Command } from 'commander';
import { Converter } from '../core/Converter.js';
import { Validator } from '../core/Validator.js';
import { formatResult, formatVerboseOutput } from '../utils/formatter.js';

export function createConvertCommand(): Command {
  const command = new Command('convert');

  command
    .description('Convert a value from one unit to another')
    .argument('<value>', 'The numeric value to convert')
    .argument('<from-unit>', 'The source unit')
    .argument('<to-unit>', 'The target unit')
    .option('-p, --precision <n>', 'Number of decimal places', '2')
    .option('-v, --verbose', 'Show conversion formula')
    .action(async (value: string, fromUnit: string, toUnit: string, options: { precision?: string; verbose?: boolean }) => {
      const validator = new Validator();
      const converter = new Converter();

      try {
        // Validate numeric value
        const numericValue = validator.validateNumericValue(value);

        // Validate precision
        const precision = validator.validatePrecision(options.precision);

        // Validate units and category match
        validator.validateUnits(fromUnit, toUnit);
        validator.validateCategoryMatch(fromUnit, toUnit);

        // Perform conversion
        const result = converter.convert(
          numericValue,
          fromUnit,
          toUnit,
          { precision, verbose: !!options.verbose }
        );

        // Output result
        if (options.verbose && result.formula) {
          console.log(formatVerboseOutput(result.value, result.toUnit, result.formula));
        } else {
          console.log(formatResult(result.value, precision));
        }

        process.exit(0);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`);
        } else {
          console.error('An unknown error occurred');
        }
        process.exit(1);
      }
    });

  return command;
}
