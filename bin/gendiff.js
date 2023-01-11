#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action(async (filepath1, filepath2) => {
    const { format } = program.opts();
    const diff = await genDiff(filepath1, filepath2, format);
    console.log('DIFFFFF\n', diff);
  });

program.parse();
