/**
 * @file Creates a new commander program for configuring a Rails application
 * @description This is the entry point of the CLI tool
 * @author CuddlyBunion341
 */

import { program } from 'commander'
import figlet from 'figlet'
import chalk from 'chalk'

import initCommand from './commands/init/init'
import createCommand from './commands/create/create'

if (process.argv.length < 3) {
  const asciiArt = figlet.textSync('crails', {
    font: 'ANSI Shadow'
  })
  console.log(chalk.red(asciiArt))
}

program
  .name('rails-configurator')
  .description('A CLI tool for configuring Rails applications')
  .version('0.1.0')

program.addCommand(initCommand)
program.addCommand(createCommand)

program.parse(process.argv)
