import inquirer from 'inquirer'
import chalk from 'chalk'

export async function getUserPreferences (): Promise<any> {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'database',
      message: 'What database would you like to use?'
    },
    {
      type: 'input',
      name: 'orm',
      message: 'What ORM would you like to use?'
    }]);
}

export function greetUser (): void {
  console.log(chalk.bold('Hello World!'))
}
