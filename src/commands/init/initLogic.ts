/**
 * @file Contains the logic for the init command
 * @description Uses small units of logic for I/O and business logic regarding the init command
 * @author CuddlyBunion341
 */

import inquirer from 'inquirer'
import chalk from 'chalk'

/**
 * Gets user preferences for configuring a Rails application with inquirer
 * @returns A promise that resolves to an object containing the user's preferences
 */
export async function getUserPreferences (): Promise<any> {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'database',
      message: 'What database would you like to use?'
    },
    {
      type: 'input',
      name: 'orm',
      message: 'What ORM would you like to use?'
    }])
}

export function greetUser (): void {
  console.log(chalk.bold('Hello World!'))
}
