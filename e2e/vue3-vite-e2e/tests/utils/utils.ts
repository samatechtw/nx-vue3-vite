import {
  copySync,
  ensureDirSync,
  readdirSync,
  readFileSync,
  removeSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'fs-extra';
import { dirname, isAbsolute } from 'path';
import { tmpProjPath } from './paths';
import { parseJson } from '@nx/devkit';
import type { JsonParseOptions } from '@nx/devkit';

/**
 * Copies module folders from the working directory to the e2e directory
 * @param modules a list of module names or scopes to copy
 */
export function copyNodeModules(modules: string[], projectPath?: string) {
  modules.forEach((module) => {
    removeSync(`${tmpProjPath(projectPath)}/node_modules/${module}`);
    copySync(
      `./node_modules/${module}`,
      `${tmpProjPath(projectPath)}/node_modules/${module}`,
    );
  });
}

/**
 * Assert test output from a asynchronous CLI command.
 *
 * @param output Output from an asynchronous command
 */
export function expectTestsPass(output: { stdout: string; stderr: string }) {
  expect(output.stderr).toContain('Ran all test suites');
  expect(output.stderr).not.toContain('fail');
}

// type callback =

/**
 * Update a file's content in the e2e directory.
 *
 * If the `content` param is a callback, it will provide the original file content as an argument.
 *
 * @param file Path of the file in the e2e directory
 * @param content Content to replace the original content with
 */
export function updateFile(
  file: string,
  content: string | ((originalFileContent: string) => string),
  projectPath?: string,
): void {
  const path = `${tmpProjPath(projectPath)}/${file}`;
  ensureDirSync(dirname(path));
  if (typeof content === 'string') {
    writeFileSync(path, content);
  } else {
    writeFileSync(path, content(readFileSync(path).toString()));
  }
}

/**
 * Rename a file or directory within the e2e directory.
 * @param path Original path
 * @param newPath New path
 */
export function renameFile(
  path: string,
  newPath: string,
  projectPath?: string,
): void {
  const p = `${tmpProjPath(projectPath)}/${path}`;
  const newP = `${tmpProjPath(projectPath)}/${newPath}`;

  ensureDirSync(dirname(newP));
  renameSync(p, newP);
}

/**
 * Check if the file or directory exists.
 *
 * If a path starts with `/` or `C:/`, it will check it as absolute. Otherwise it will check within the e2e directory.
 *
 * @param expectedPaths Files or directories to check
 * @usage `checkFileExists('file1', 'file2', '/var/user/file')`
 */
export function checkFilesExist(projectPath: string, expectedPaths: string[]) {
  expectedPaths.forEach((path) => {
    const p = `${tmpProjPath(projectPath)}/${path}`;
    const filePath = isAbsolute(path) ? path : p;
    if (!exists(filePath)) {
      throw new Error(`'${filePath}' does not exist`);
    }
  });
}

/**
 * Get a list of all files within a directory.
 * @param dirName Directory name within the e2e directory.
 */
export function listFiles(projectPath: string, dirName: string): string[] {
  const path = `${tmpProjPath(projectPath)}/${dirName}`;
  return readdirSync(path);
}

/**
 * Read a JSON file.
 * @param path Path to the JSON file. Absolute or relative to the e2e directory.
 * @param options JSON parse options
 */
export function readJson<T extends object = any>(
  projectPath: string,
  path: string,
  options?: JsonParseOptions,
): T {
  return parseJson<T>(readFile(projectPath, path), options);
}

/**
 * Read a file.
 * @param path Path to the file. Absolute or relative to the e2e directory.
 */
export function readFile(projectPath: string, path: string): string {
  const p = `${tmpProjPath(projectPath)}/${path}`;
  const filePath = isAbsolute(path) ? path : p;
  return readFileSync(filePath, 'utf-8');
}

/**
 * Deletes the e2e directory
 */
export function cleanup(projectPath: string): void {
  removeSync(tmpProjPath(projectPath));
}

/**
 * Remove the dist folder from the e2e directory
 */
export function rmDist(projectPath: string): void {
  removeSync(`${tmpProjPath(projectPath)}/dist`);
}

/**
 * Get the currend `cwd` in the process
 */
export function getCwd(): string {
  return process.cwd();
}

/**
 * Check if a directory exists
 * @param directoryPath Path to directory
 */
export function directoryExists(directoryPath: string): boolean {
  try {
    return statSync(directoryPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Check if a file exists.
 * @param filePath Path to file
 */
export function fileExists(filePath: string): boolean {
  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * Check if a file or directory exists.
 * @param path Path to file or directory
 */
export function exists(path: string): boolean {
  return directoryExists(path) || fileExists(path);
}

/**
 * Get the size of a file on disk
 * @param filePath Path to the file
 */
export function getSize(filePath: string): number {
  return statSync(filePath).size;
}
