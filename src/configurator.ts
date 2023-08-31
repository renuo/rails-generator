/**
 * @file Helper functions for configuring and creating a new Rails project
 * @author CuddlyBunion341
 */

import { execSync } from 'child_process'

/**
 * Creates a new Rails project with the given name.
 *
 * @param name The name of the project.
 * @returns void
 *
 * This code is useful for creating a new Rails project with the given name, while skipping certain components such as action-mailer, action-mailbox, action-text, active-record, active-job, active-storage, action-cable, asset-pipeline, javascript, hotwire, jbuilder, test, system-test, bootsnap, and bundle. This is useful for creating a minimal Rails project with only the necessary components.
 */
export function createProject (name: string): void {
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

  execSync(`rails new ${name} ${skips} --minmal`, { stdio: 'inherit' })
}
