#!/usr/bin/env node

/**
 * @file Creates a new commander program for configuring a Rails application
 * @description This is the entry point of the CLI tool
 * @author CuddlyBunion341
 */

import { program } from 'commander'
import figlet from 'figlet'
import chalk from 'chalk'

import { createProject } from './configurator'

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

program.command('greet <name>').action((name) => {
  console.log(`Hello ${name}`)
})

program.command('create <name>').action((name) => {
  console.log(`Creating a new Rails project with the name ${name}`)
  createProject(name)
})

program.parse(process.argv)
