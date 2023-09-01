/**
 * @file Contains the command definition for the create command
 * @description Creates a minimal Rails application with the specified name
 * @author CuddlyBunion341
 */

import { createApp } from './createLogic'
import { Command } from 'commander'

const createCommand = new Command('create')
  .description('Creates a new Rails application')
  .argument('<name>', 'The name of the Rails application')
  .action((name) => {
    createApp(name)
  })

export default createCommand
