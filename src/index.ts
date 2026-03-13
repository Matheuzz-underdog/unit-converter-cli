#!/usr/bin/env node

import { Command } from 'commander';
import { createConvertCommand } from './commands/convert.js';
import { createListCommand } from './commands/list.js';

const program = new Command();

program
  .name('convert')
  .description('CLI tool for converting units across multiple measurement categories')
  .version('1.0.0');

// Register commands
program.addCommand(createConvertCommand());
program.addCommand(createListCommand());

// Handle no command
program.on('command:*', () => {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse();
