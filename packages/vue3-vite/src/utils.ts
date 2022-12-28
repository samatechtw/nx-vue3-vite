import {
  ExecutorContext,
  joinPathFragments,
  addDependenciesToPackageJson,
  removeDependenciesFromPackageJson,
  Tree,
  GeneratorCallback,
  updateJson,
  names,
} from '@nrwl/devkit';
import { jestProjectGenerator } from '@nrwl/jest';

function sortObjectByKeys(obj: unknown): unknown {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      return {
        ...result,
        [key]: obj[key],
      };
    }, {});
}

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
  ensureDepsInPackageJson(host);
  const depKeys = Object.keys(deps);
  const devDepKeys = Object.keys(devDeps);
  removeDependenciesFromPackageJson(host, depKeys, devDepKeys);
  return addDependenciesToPackageJson(host, deps, devDeps);
}

/**
 * Ensures that both `dependencies` and `devDependencies` exists in `package.json`.
 * If not, this function will create them in `package.json`.
 */
export function ensureDepsInPackageJson(host: Tree) {
  updateJson(host, 'package.json', (json) => {
    if (!json.dependencies) {
      json.dependencies = {};
    }
    if (!json.devDependencies) {
      json.devDependencies = {};
    }
    return json;
  });
}

export function updateScripts(host: Tree, scripts: Record<string, string>) {
  updateJson(host, 'package.json', (json) => {
    json.scripts = sortObjectByKeys({
      ...json.scripts,
      ...scripts,
    });

    return json;
  });
}

export function getCaseAwareFileName(options: {
  pascalCaseFiles: boolean;
  fileName: string;
}) {
  const normalized = names(options.fileName);

  return options.pascalCaseFiles ? normalized.className : normalized.fileName;
}

export function parseTags(tagsStr: string): string[] {
  return tagsStr ? tagsStr.split(',').map((s) => s.trim()) : [];
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
