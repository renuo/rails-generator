import { createApp } from './createLogic'
import { Command } from 'commander'

const createCommand = new Command('create')
  .description('Creates a new Rails application')
  .argument('<name>', 'The name of the Rails application')
  .action((name) => {
    createApp(name)
  })

export default createCommand
