import { exec } from 'child_process';
import { tmpProjPath } from './paths';
import { getPackageManagerCommand } from '@nrwl/devkit';

/**
 * Run a command asynchronously inside the e2e directory.
 *
 * @param command
 * @param opts
 */
export function runCommandAsync(
  projectPath: string,
  command: string,
  opts = {
    silenceError: false,
  }
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        cwd: tmpProjPath(projectPath),
      },
      (err, stdout, stderr) => {
        if (!opts.silenceError && err) {
          reject(err);
        }
        resolve({ stdout, stderr });
      }
    );
  });
}

/**
 * Run a nx command asynchronously inside the e2e directory
 * @param command
 * @param opts
 */
export function runNxCommandAsync(
  projectPath: string,
  command: string,
  opts = {
    silenceError: false,
  }
): Promise<{ stdout: string; stderr: string }> {
  const pmc = getPackageManagerCommand();
  return runCommandAsync(projectPath, `${pmc.exec} nx ${command}`, opts);
}
