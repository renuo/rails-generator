/**
 * @file Contains the logic for the create command
 * @description Creates a minimal Rails application with the specified name
 * @author CuddlyBunion341
 */

import { execSync } from 'child_process'

/**
 * Creates a new Rails application with the specified name
 * @param name The name of the Rails application
 */
export function createApp (name: string): void {
  const skips = [
    'action-mailer',
    'action-mailbox',
    'action-text',
    'active-record',
    'active-job',
    'active-storage',
    'action-cable',
    'asset-pipeline',
    'javascript',
    'hotwire',
    'jbuilder',
    'test',
    'system-test',
    'bootsnap',
    'bundle'
  ]
    .map((v) => `--skip-${v}`)
    .join(' ')

  execSync(`rails new ${name} ${skips} --minimal`, { stdio: 'inherit' })
}
