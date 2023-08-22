import { exec, execSync } from 'child_process';
import { createSpinner } from 'nanospinner';

/**
 * Wrap exec command in a spinner
 * @param {*} command The command to execute
 * @param {*} params The parameters to pass to the command
 * @param {*} message The message to display in the spinner
 * @returns {Promise} A promise that resolves to the stdout of the command
 */
export const wrapExec = (command, params, message) => {
  const spinner = createSpinner(message).start();

  return new Promise((resolve, reject) => {
    exec(`${command} ${params.join(' ')}`, (err, stdout, stderr) => {
      if (err) {
        spinner.error({ text: message });
        reject(err);
        return;
      }

      if (stderr) {
        spinner.error({ text: message });
        reject(stderr);
        return;
      }

      spinner.success({ text: message });
      resolve(stdout);
    });
  });
};

/**
 * Wraps a async function in a spinner
 * @param {*} message The message to display in the spinner
 * @param {*} callback The async function to wrap
 * @returns {Promise} A promise that resolves to the result of the callback
 */
export const wrapSpinner = (message, callback) => {
  const spinner = createSpinner(message).start();

  return new Promise((resolve, reject) => {
    callback()
      .then((result) => {
        spinner.success({ text: message });
        resolve(result);
      })
      .catch((err) => {
        spinner.error({ text: message });
        reject(err);
      });
  });
};

/**
 * Wrap execSync command in a spinner
 * @param {*} command The command to execute
 * @param {*} params The parameters to pass to the command
 * @param {*} message The message to display in the spinner
 * @returns {Promise} A promise that resolves to the stdout of the command
 */
export const wrapExecSync = (command, params, message) => {
  const spinner = createSpinner(message).start();

  try {
    const stdout = execSync(`${command} ${params.join(' ')}`);
    spinner.success({ text: message });
    return stdout;
  } catch (err) {
    spinner.error({ text: message });
    throw err;
  }
};
