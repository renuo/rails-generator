/* eslint-disable import/extensions */
import { exec } from 'child_process';
import * as fs from 'fs';
import { wrapSpinner } from './fs.js';

/* eslint-disable import/prefer-default-export */
export const createScriptFile = (filename, content) => {
  content.unshift('#!/bin/sh');
  return wrapSpinner(`Creating ${filename}`, async () => {
    fs.writeFileSync(filename, content.join('\n'));

    exec(`chmod +x ${filename}`, (err) => {
      if (err) throw err;
    });
  });
};

/**
 * Appends content to a file and displays a spinner
 * @param {*} filename The filename to append to
 * @param {*} content The content to append
 * @return {Promise} A promise that resolves when the content has been appended
 */
export function appendFile(filename, content) {
  return wrapSpinner(`Appending content to ${filename}`, async () => {
    fs.appendFileSync(filename, content.join('\n'));
  });
}

/**
 * Appends content to a file at a specific line
 * @param {*} filename The filename to append to
 * @param {*} line The line(s) to append at
 * @param {*} content The content to append
 * @returns {Promise} A promise that resolves when the content has been appended
 */
export function appendFileAtLine(filename, line, content) {
  return wrapSpinner(`Appending content to ${filename}`, async () => {
    const file = fs.readFileSync(filename, 'utf-8').split('\n');
    file.splice(line, 0, ...content);

    fs.writeFileSync(filename, file.join('\n'));
  });
}

/**
 * Searches a file for a line and returns the line number
 * @param {*} filename The file to search
 * @param {*} substring The string to search for
 * @return {Promise} A promise that resolves to a object containing the line number and the line
 */
export function getLine(filename, substring) {
  const file = fs.readFileSync(filename, 'utf-8').split('\n');
  const line = file.find((v) => new RegExp(substring, 'g').exec(v));
  const index = file.indexOf(line);
  return { index, line };
}

/**
 * Replaces a line in a file
 * @param {*} filename The file to replace the line in
 * @param {*} line The line to replace
 * @param {*} content The content to replace the line with
 * @param {*} autoIndent Whether to auto indent the content
 */
export function replaceLine(filename, line, content, autoIndent = true) {
  wrapSpinner(`Replacing line ${line} in ${filename}`, async () => {
    const lines = fs.readFileSync(filename, 'utf-8').split('\n');
    let indent = '';
    if (autoIndent) {
      [indent] = lines[line].match(/^\s*/);
    }
    lines[line] = `${indent}${content}`;
  });
}

/**
 * Replace a line in a file matching a regex
 * @param {*} filename The file to replace the line in
 * @param {*} regex The regex to match
 * @param {*} content The content to replace the line with
 * @param {*} autoIndent Whether to auto indent the content
 * @return {Promise} A promise that resolves when the line has been replaced
 */
export function replaceLineWithRegex(filename, regex, content, autoIndent = true) {
  const { index } = getLine(filename, regex);
  replaceLine(filename, index, content, autoIndent);
}

/**
 * Uncomments a block of code
 * @param {*} filename The file to uncomment in
 * @param {*} start The line number to start uncommenting at
 * @param {*} end The line number to end uncommenting at
 */
export function uncommentFile(filename, start, end) {
  const file = fs.readFileSync(filename, 'utf-8').split('\n');
  for (let i = start; i <= end; i += 1) {
    file[i] = file[i].replace(/^(\s*)# /, '$1');
    file[i] = file[i].replace(/^(\s*)\/\/ /, '$1');
  }
  fs.writeFileSync(filename, file.join('\n'));
}
