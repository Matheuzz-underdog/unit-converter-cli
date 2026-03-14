#!/usr/bin/env node

import { Command } from 'commander';
import { createListCommand } from './commands/list.js';
import { createConvertAction } from './commands/convert.js';

const program = new Command();

program
  .name('convert')
  .description('CLI tool for converting units across multiple measurement categories')
  .version('1.0.0')
  .argument('<value>', 'The numeric value to convert')
  .argument('<from-unit>', 'The source unit')
  .argument('<to-unit>', 'The target unit')
  .option('-p, --precision <n>', 'Number of decimal places', '2')
  .option('-v, --verbose', 'Show conversion formula')
  .action(createConvertAction);

// Register list as subcommand
program.addCommand(createListCommand());

// Handle no command
program.on('command:*', () => {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse();
