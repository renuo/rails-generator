#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import chalk from 'chalk';
import { existsSync } from 'fs';
import { inputCheckbox, inputList, inputText } from '../lib/inquirer.js';
import { wrapExec, wrapSpinner } from '../lib/fs.js';
import { createScriptFile, appendFile } from '../lib/files.js';

const { log } = console;

/**
 * Main function
 * @param {number} step The step to start at (Useful if you want to continue a failed run)
 * @param {string} dir The directory to create the rails application in
 */
const main = async (step = 0, dir = null) => {
  log(chalk.bold('Hello World!'));

  const projectName = dir || await inputText('What do you want the rails application to be called?', 'my-rails-app');

  if (step < 1) {
    // test if directory exists
    if (existsSync(projectName)) {
      log(chalk.red.bold('Error: ') + chalk.red(`Directory ${projectName} already exists`));
      process.exit(1);
    }
  }

  if (step < 2) {
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
  }

  if (step < 3) {
    await wrapSpinner('Creating convenience scripts', async () => {
      await createScriptFile(`${projectName}/bin/run`, [
        'rails server',
      ]);

      await createScriptFile(`${projectName}/bin/check`, [
        'set -e',
        'bin/fastcheck',
        'bin/rails zeitwerk:check',
      ]);

      await createScriptFile(`${projectName}/bin/fastcheck`, [
        'set -e',
        'echo "moinsen"',
      ]);
    });
    await appendFile(`${projectName}/bin/setup`, [
      'puts "\n== Copying sample files =="',
      'unless File.exist?(\'config/application.yml\')',
      '  system! \'cp config/application.example.yml config/application.yml\'',
      'end    ',
    ]);
  }

  if (step < 4) {
    // TODO: Remove args when issue https://github.com/laserlemon/figaro/issues/292 is fixed
    await wrapExec(`cd ${projectName} && bundle add figaro`, ['--git=https://github.com/muhenge/figaro', '--branch=Muhenge-Fix'], 'Adding figaro gem');
    await wrapExec(`cd ${projectName} && bundle exec`, ['figaro install'], 'Installing figaro gem');
  }

  if (step < 5) {
    const rakeSecret = await wrapExec(`cd ${projectName} && rake secret`, [], 'Generating a secret key');
    await wrapExec(`rm ${projectName}/config/application.yml`, [], 'Removing application.yml');
    await appendFile(`${projectName}/config/application.example.yml`, [
      `SECRET_KEY_BASE: ${rakeSecret}`,
      'APP_PORT: 3000',
    ]);
    await appendFile(`${projectName}/.gitignore`, [
      '# Ignore application.yml',
      'config/application.yml',
    ]);

    await appendFile(`${projectName}/config/initializers/figaro.rb`, [
      'Figaro.require_keys(YAML.load_file(\'config/application.example.yml\').keys - %w[test production development])',
    ]);
  }
};

// For debugging purposes
const step = process.argv[2]; // Where to start the script from
const dir = process.argv[3]; // The project directory

main(step, dir).catch((error) => {
  log(chalk.red(error.message));
});
