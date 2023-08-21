import inquirer from 'inquirer';

/**
 * Returns a promise that resolves to the answer to the prompt
 * @param {*} prompt The inquirer prompt
 * @returns {Promise} A promise that resolves to the answer to the prompt
 */
export const inquirerPromise = (prompt) => new Promise((resolve, reject) => {
  prompt.then((answer) => {
    resolve(answer.input);
  }).catch((err) => {
    reject(err);
  });
});

/**
 * Input text prompt
 * @param {*} message The message to display
 * @param {*} defaultValue The default value
 * @returns {Promise} A promise that resolves to the answer to the prompt
 */
export const inputText = (message, defaultValue) => inquirerPromise(inquirer.prompt([
  {
    name: 'input',
    message,
    default: defaultValue,
  },
]));

/**
 * Input radio prompt
 * @param {*} message The message to display
 * @param {*} choices The choices to display
 * @returns {Promise} A promise that resolves to the answer to the prompt
 */
export const inputList = (message, choices) => inquirerPromise(inquirer.prompt([
  {
    name: 'input',
    message,
    type: 'list',
    choices,
    default: choices[0],
  },
]));

/**
 * Input checkbox prompt
 * @param {*} message The message to display
 * @param {*} checked The default value
 * @returns {Promise} A promise that resolves to the answer to the prompt
 */
export const inputCheckbox = (message, checked) => inquirerPromise(inquirer.prompt([
  {
    name: 'input',
    message,
    type: 'confirm',
    default: checked,
  },
]));
