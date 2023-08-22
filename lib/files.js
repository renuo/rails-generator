/* eslint-disable import/extensions */
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { wrapSpinner } from './fs.js';

/* eslint-disable import/prefer-default-export */
export const createScriptFile = (filename, content) => {
  content.unshift('#!/usr/bin/sh');
  return wrapSpinner(`Creating ${filename}`, async () => {
    fs.writeFile(filename, content.join('\n'));

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
    fs.appendFile(filename, content.join('\n'));
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
    const lines = fs.readFile(filename);
    let indent = '';
    if (autoIndent) {
      [indent] = lines[line].match(/^\s*/);
    }
    lines[line] = `${indent}${content}`;
  });
}
