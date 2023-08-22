#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import chalk from 'chalk';
import { existsSync } from 'fs';
import { inputCheckbox, inputList, inputText } from '../lib/inquirer.js';
import { wrapExec, wrapSpinner } from '../lib/fs.js';
import {
  createScriptFile, appendFile, uncommentFile, replaceLineWithRegex, appendFileAtLine,
} from '../lib/files.js';

const { log } = console;

/**
 * Main function
 * @param {number} step The step to start at (Useful if you want to continue a failed run)
 * @param {string} dir The directory to create the rails application in
 */
const main = async () => {
  log(chalk.bold('Hello World!'));

  const projectName = await inputText('What do you want the rails application to be called?', 'my-rails-app');

  // test if directory exists
  if (existsSync(projectName)) {
    log(chalk.red.bold('Error: ') + chalk.red(`Directory ${projectName} already exists`));
    process.exit(1);
  }

  /* Collect user input */

  const database = await inputList('What database do you want to use?', ['postgresql', 'mysql']);
  const testFramework = await inputList('What test framework do you want to use?', ['rspec', 'minitest']);
  const includeMailers = await inputCheckbox('Do you want to include mailers?', false);
  const timeZone = await inputText("What's your time zone?", 'Zurich');
  const defaultLocale = await inputText("What's your default locale?", 'de');

  /* Create new rails app */

  log(chalk.bold(`Creating a new ${projectName}`));

  const args = [
    projectName,
    `--database=${database}`,
  ];
  if (testFramework === 'rspec') args.push('--skip-test');
  if (!includeMailers) args.push('--skip-action-mailer');

  await wrapExec('rails new', args, 'Creating a new rails application');

  process.chdir(projectName);

  /* Setup application */

  await wrapExec('bin/setup', [], 'Setting up rails application');
  await wrapExec('bundle exec', ['rails', 'db:migrate'], 'Running database migrations');

  /* Add convenience scripts */

  await createScriptFile('bin/run', [
    'rails server',
  ]);

  await createScriptFile('bin/check', [
    'set -e',
    'bin/fastcheck',
    'bin/rails zeitwerk:check',
  ]);

  await createScriptFile('bin/fastcheck', [
    'set -e',
    'echo "moinsen"',
  ]);

  /* Add figaro */

  uncommentFile('bin/setup', 19, 22);
  // TODO: Remove args when issue https://github.com/laserlemon/figaro/issues/292 is fixed
  await wrapExec('bundle add figaro', ['--git=https://github.com/muhenge/figaro', '--branch=Muhenge-Fix'], 'Adding figaro gem');
  await wrapExec('bundle exec figaro install', [], 'Installing figaro gem');
  await wrapExec('rm config/application.yml', [], 'Removing application.yml');

  const rakeSecret = await wrapExec('rake secret', [], 'Generating a secret key');
  await appendFile('config/application.example.yml', [
    `SECRET_KEY_BASE: ${rakeSecret}`,
    'APP_PORT: "3000"',
  ]);
  await appendFile('.gitignore', [
    '# Ignore application.yml',
    'config/application.yml',
  ]);

  await appendFileAtLine('bin/setup', 19, [
    '  puts "\\n== Copying sample files =="',
    '  unless File.exist?(\'config/application.yml\')',
    '    system! \'cp config/application.example.yml config/application.yml\'',
    '  end\n',
  ]);

  await appendFile('config/initializers/figaro.rb', [
    'Figaro.require_keys(YAML.load_file(\'config/application.example.yml\').keys - %w[test production development])',
  ]);

  await wrapExec('bin/setup', [], 'Setting up application.yml');

  /* Configure environments */

  replaceLineWithRegex('config/application.rb', /config.time_zone = 'Central Time \(US & Canada\)'/, `config.time_zone = '${timeZone}'`);
  // configure locale
  // configure ssl, RAILS_LOG_LEVEL

  // configure action_on_unpermitted_parameters
  // configure i18n raise_on_missing_translations

  // configure action_on_unpermitted_parameters
  // configure raise_on_missing_translations
  // configure exception handler
  // configure active record verbose_query_logs

  // Add rakefile task

  /* Start the application */

  await wrapExec('bin/run', [], 'Started rails server: http://localhost:3000');
};

main();
