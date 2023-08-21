#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

const log = console.log

const main = () => {
    log(chalk.bold("Hello World!"));

    inquirer.prompt([
        {
            name: 'username',
            message: 'What is your name?'
        }
    ])
    .then(answers => {
        answers.username ||= 'Anonymous';
        log(chalk.blue(`Hello ${answers.username}!`))
    });
}

main();
