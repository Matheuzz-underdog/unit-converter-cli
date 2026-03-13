import { Command } from 'commander';
import { allCategories, allRegistries } from '../units/index.js';
import { Category } from '../types.js';

export function createListCommand(): Command {
  const command = new Command('list');

  command
    .description('List all available units or units for a specific category')
    .argument('[category]', 'Optional category name (length, weight, temperature, volume, area, time, speed, data)')
    .action(async (categoryArg?: string) => {
      try {
        if (categoryArg) {
          // List specific category
          const category = categoryArg.toLowerCase() as Category;
          
          if (!allRegistries[category]) {
            console.error(`Error: Unknown category "${categoryArg}".`);
            console.log('Valid categories: length, weight, temperature, volume, area, time, speed, data');
            process.exit(1);
          }

          const catConfig = allCategories.find(c => c.name === category);
          if (!catConfig) {
            console.error(`Error: Category configuration not found for "${category}"`);
            process.exit(1);
          }

          console.log(`\n${category.toUpperCase()} (Base unit: ${catConfig.baseUnit})`);
          console.log('─'.repeat(40));
          
          for (const [symbol, def] of Object.entries(allRegistries[category])) {
            console.log(`  ${symbol.padEnd(8)} - ${def.name}`);
          }
          console.log();
        } else {
          // List all categories
          console.log('\nAvailable Categories:');
          console.log('═'.repeat(50));
          
          for (const catConfig of allCategories) {
            const units = Object.keys(allRegistries[catConfig.name]);
            console.log(`\n${catConfig.name.toUpperCase()} (base: ${catConfig.baseUnit})`);
            console.log(`  ${units.join(', ')}`);
          }
          console.log('\n' + '═'.repeat(50));
          console.log('\nUsage: convert <value> <from-unit> <to-unit>');
          console.log('       list [category]');
          console.log('       convert --help for more options\n');
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
