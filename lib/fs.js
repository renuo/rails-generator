import { exec, execSync } from 'child_process';
import { createSpinner } from 'nanospinner';

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
