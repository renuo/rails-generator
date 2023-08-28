#!/usr/bin/env node
"use strict";
/**
 * @file Creates a new commander program for configuring a Rails application
 * @description This is the entry point of the CLI tool
 * @author CuddlyBunion341
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const configurator_1 = require("./configurator");
if (process.argv.length < 3) {
    const asciiArt = figlet_1.default.textSync('crails', {
        font: 'ANSI Shadow'
    });
    console.log(chalk_1.default.red(asciiArt));
}
commander_1.program
    .name('rails-configurator')
    .description('A CLI tool for configuring Rails applications')
    .version('0.1.0');
commander_1.program.command('greet <name>').action((name) => {
    console.log(`Hello ${name}`);
});
commander_1.program.command('create <name>').action((name) => {
    console.log(`Creating a new Rails project with the name ${name}`);
    (0, configurator_1.createProject)(name);
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=program.js.map