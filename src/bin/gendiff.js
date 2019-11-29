#!/usr/bin/env node
import gendiff from '..';

const program = require('commander');

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'nested')
  .action((firstConfig, secondConfig, options) => {
    const type = options.format;
    console.log(gendiff(firstConfig, secondConfig, type));
  });

program.parse(process.argv);
