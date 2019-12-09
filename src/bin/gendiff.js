#!/usr/bin/env node
import program from 'commander';
import path from 'path';
import genDiff from '..';

program
  .version('1.0.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'pretty')
  .action((firstConfig, secondConfig, options) => {
    const type = options.format;
    const absolutionPath1 = path.resolve(process.cwd(), firstConfig);
    const absolutionPath2 = path.resolve(process.cwd(), secondConfig);
    console.log(genDiff(absolutionPath1, absolutionPath2, type));
  });

program.parse(process.argv);
