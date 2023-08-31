#!/usr/bin/env bun

/**
 * @file Runs the CLI application for configuring a Rails application
 * @description It is a straightforward application that utilizes the inquirer library to prompt the user
 * with a series of questions. Based on the answers provided,
 * it will generate a Rails application.
 * @author CuddlyBunion341
 */

import chalk from 'chalk'
import inquirer from 'inquirer'

const { log } = console // Destructure log, because we use it a lot

/**
 * Main entry point for the CLI application
 */
async function main (): Promise<void> {
  log(chalk.bold('Hello World!'))

  const projectName = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    }
  ])

  log(chalk.bold(`TODO: Create a new Rails project with the name ${projectName.name}`))
}

main()
  .then(() => { log(chalk.bold.green('Done!')) })
  .catch((err) => { log(chalk.bold.red(err)) })
