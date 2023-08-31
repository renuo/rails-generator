import { Command } from 'commander'
import { getUserPreferences, greetUser } from './initLogic'

const initCommand = new Command('init')
  .description('Initializes a new Rails application')
  .argument('<name>', 'The name of the Rails application')
  .action(async (name) => {
    greetUser()
    const preferences = await getUserPreferences()
    console.log(preferences)
  })
export default initCommand