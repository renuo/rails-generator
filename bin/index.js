#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import chalk from 'chalk';
import { existsSync } from 'fs';
import { inputCheckbox, inputList, inputText } from '../lib/inquirer.js';
import { wrapExec } from '../lib/fs.js';

const { log } = console;

/**
 * Main function
 */
const main = async () => {
  log(chalk.bold('Hello World!'));

  const projectName = await inputText('What do you want the rails application to be called?', 'my-rails-app');

  // test if directory exists
  if (existsSync(projectName)) {
    log(chalk.red.bold('Error: ') + chalk.red(`Directory ${projectName} already exists`));
    process.exit(1);
  }

  const database = await inputList('What database do you want to use?', ['postgresql', 'mysql']);
  const testFramework = await inputList('What test framework do you want to use?', ['rspec', 'minitest']);
  const includeMailers = await inputCheckbox('Do you want to include mailers?', false);

  log(chalk.bold(`Creating a new ${projectName}`));

  const args = [
    projectName,
    `--database=${database}`,
  ];
  if (testFramework === 'rspec') args.push('--skip-test');
  if (!includeMailers) args.push('--skip-action-mailer');

  await wrapExec('rails new', args, 'Creating a new rails application');
  await wrapExec(`cd ${projectName} && bin/setup`, [], 'Setting up rails application');
  await wrapExec(`cd ${projectName} && bundle exec`, ['rails', 'db:migrate'], 'Running database migrations');
  await wrapExec(`cd ${projectName} && rails`, ['server'], 'Running rails server at http://localhost:3000');
};

main();
