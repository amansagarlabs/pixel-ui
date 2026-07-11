#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { removeCommand } from './commands/remove';
import { listCommand } from './commands/list';
import { doctorCommand } from './commands/doctor';
import { testCommand } from './commands/test';
import { upgradeCommand } from './commands/upgrade';

export const program = new Command();

program
  .name('pixel-ui')
  .description('pixel-ui - AI Agent primitives registry')
  .version('0.1.0');

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(removeCommand);
program.addCommand(listCommand);
program.addCommand(doctorCommand);
program.addCommand(testCommand);
program.addCommand(upgradeCommand);

program.parse();
