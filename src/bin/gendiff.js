#!/usr/bin/env node
import genDiff from '..';

const program = require('commander');

program
  .version('1.0.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'pretty')
  .action((firstConfig, secondConfig, options) => {
    const type = options.format;
    console.log(genDiff(firstConfig, secondConfig, type));
  });

program.parse(process.argv);
