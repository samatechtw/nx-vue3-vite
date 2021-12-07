import {
  ExecutorContext,
  joinPathFragments,
  addDependenciesToPackageJson,
  removeDependenciesFromPackageJson,
  Tree,
  GeneratorCallback,
} from '@nrwl/devkit';
import { jestProjectGenerator } from '@nrwl/jest';

export function getProjectRoot(context: ExecutorContext): string {
  if (context.projectName) {
    return joinPathFragments(context.root, projectRelativePath(context));
  }
  return context.root;
}

export function projectRelativePath(context: ExecutorContext): string {
  return context.workspace.projects[context.projectName].root;
}

export function getWorkspaceRoot(context: ExecutorContext): string {
  return context.root;
}

export function updateDependencies(
  host: Tree,
  deps: Record<string, string>,
  devDeps: Record<string, string>
) {
  // Make sure we don't have dependency duplicates
  const depKeys = Object.keys(deps);
  const devDepKeys = Object.keys(devDeps);
  removeDependenciesFromPackageJson(host, depKeys, devDepKeys);
  return addDependenciesToPackageJson(host, deps, devDeps);
}

export async function addJest(host: Tree, projectName: string) {
  const jestTask = await jestProjectGenerator(host, {
    project: projectName,
    supportTsx: false,
    skipSerializers: true,
    setupFile: 'none',
    babelJest: true,
  });

  return jestTask;
}

// Borrowed from https://github.com/nrwl/nx/blob/a3c08a9153360371ee09771389299201b3407e00/packages/workspace/src/utilities/run-tasks-in-serial.ts
export function runTasksInSerial(
  ...tasks: GeneratorCallback[]
): GeneratorCallback {
  return async () => {
    for (const task of tasks) {
      await task();
    }
  };
}
