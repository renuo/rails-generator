#!/usr/bin/env node
"use strict";
/**
 * @file Runs the CLI application for configuring a Rails application
 * @description It is a straightforward application that utilizes the inquirer library to prompt the user
 * with a series of questions. Based on the answers provided,
 * it will generate a Rails application.
 * @author CuddlyBunion341
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const { log } = console; // Destructure log, because we use it a lot
/**
 * Main entry point for the CLI application
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        log(chalk_1.default.bold('Hello World!'));
        const projectName = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project?'
            }
        ]);
        log(chalk_1.default.bold(`TODO: Create a new Rails project with the name ${projectName.name}`));
    });
}
main()
    .then(() => { log(chalk_1.default.bold.green('Done!')); })
    .catch((err) => { log(chalk_1.default.bold.red(err)); });
//# sourceMappingURL=index.js.map