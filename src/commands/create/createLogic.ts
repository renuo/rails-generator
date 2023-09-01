import { execSync } from 'child_process'

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
