/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { wrapExec } from './fs.js';

export const addGem = (project, gem, environment = 'default') => {
  const command = `cd ${project} && bundle add ${gem}`;
  return wrapExec(command, [], `Adding ${gem} to ${environment} environment`);
};
