// Copied from https://github.com/nx/nx/blob/3b21f4dfeaed2058b1d773c95526ffa6761c251e/packages/nx-plugin/src/utils/testing-utils/nx-project.ts

import { workspaceRoot } from '@nx/devkit';
import {
  getPackageManagerCommand,
  readJsonFile,
  writeJsonFile,
} from '@nx/devkit';
import { execSync } from 'child_process';
import { dirname } from 'path';
import { ensureDirSync } from 'fs-extra';
import { tmpProjPath } from './paths';
import { cleanup } from './utils';

function runNxNewCommand(args: string, silent: boolean, projectPath: string) {
  const localTmpDir = dirname(tmpProjPath(projectPath));
  return execSync(
    `node ${require.resolve(
      'nx'
    )} new ${projectPath} --nx-workspace-root=${localTmpDir} --no-interactive --skip-install --collection=@nx/workspace --npmScope=${projectPath} --preset=empty ${
      args || ''
    }`,
    {
      cwd: localTmpDir,
      ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
    }
  );
}

export function patchPackageJsonForPlugin(
  npmPackageName: string,
  distPath: string,
  projectPath?: string
) {
  const path = `${tmpProjPath(projectPath)}/${'package.json'}`;
  const json = readJsonFile(path);
  json.devDependencies[npmPackageName] = `file:${workspaceRoot}/${distPath}`;
  writeJsonFile(path, json);
}

/**
 * Generate a unique name for running CLI commands
 * @param prefix
 *
 * @returns `'<prefix><random number>'`
 */
export function uniq(prefix: string) {
  return `${prefix}${Math.floor(Math.random() * 10000000)}`;
}

/**
 * Run the appropriate package manager install command in the e2e directory
 * @param silent silent output from the install
 */
export function runPackageManagerInstall(
  silent: boolean = true,
  projectPath?: string
) {
  const pmc = getPackageManagerCommand();
  const install = execSync(pmc.install, {
    cwd: tmpProjPath(projectPath),
    ...(silent ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
  });
  return install ? install.toString() : '';
}

/**
 * Creates a new nx project in the e2e directory
 *
 * @param npmPackageName package name to test
 * @param pluginDistPath dist path where the plugin was outputted to
 */
export function newNxProject(
  npmPackageName: string,
  pluginDistPath: string,
  projectPath: string
): void {
  cleanup(projectPath);
  runNxNewCommand('', true, projectPath);
  patchPackageJsonForPlugin(npmPackageName, pluginDistPath, projectPath);
  runPackageManagerInstall(true, projectPath);
}

/**
 * Ensures that a project has been setup in the e2e directory
 * It will also copy `@nx` packages to the e2e directory
 */
export function ensureNxProject(
  npmPackageName: string,
  pluginDistPath: string,
  projectPath: string
): void {
  ensureDirSync(tmpProjPath(projectPath));
  newNxProject(npmPackageName, pluginDistPath, projectPath);
}
