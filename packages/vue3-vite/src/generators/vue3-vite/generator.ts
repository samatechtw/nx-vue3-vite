import {
  addProjectConfiguration,
  addDependenciesToPackageJson,
  removeDependenciesFromPackageJson,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  GeneratorCallback,
  joinPathFragments,
  updateJson,
} from '@nrwl/devkit';
import { addPackageWithInit, generateProjectLint, addLintFiles } from '@nrwl/workspace';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { Linter } from '@nrwl/linter/src/generators/utils/linter';
import { lintProjectGenerator } from '@nrwl/linter';
import * as path from 'path';
import { Vue3ViteGeneratorSchema } from './schema';
import { DevDependencies, Dependencies } from '../../defaults';
import { eslintDefault } from './eslint-default';

interface NormalizedSchema extends Vue3ViteGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  host: Tree,
  options: Vue3ViteGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(host).appsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(host: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    host,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

function updateDependencies(host: Tree) {
  // Make sure we don't have dependency duplicates
  const deps = Object.keys(Dependencies);
  const devDeps = Object.keys(Dependencies);
  removeDependenciesFromPackageJson(host, devDeps, deps);
  return addDependenciesToPackageJson(host, Dependencies, DevDependencies);
}

async function addLinting(host: Tree, options: NormalizedSchema) {
  const tasks: GeneratorCallback[] = [];
  const lintTask = await lintProjectGenerator(host, {
    linter: Linter.EsLint,
    project: options.projectName,
    tsConfigPaths: [
      joinPathFragments(options.projectRoot, 'tsconfig.app.json'),
    ],
    eslintFilePatterns: [`${options.projectRoot}/**/*.{ts,tsx,js,jsx}`],
    skipFormat: true,
  });
  tasks.push(lintTask);

  const eslintJson = eslintDefault;

  console.log('ESLINT', eslintJson);

  updateJson(
    host,
    joinPathFragments(options.projectRoot, '.eslintrc.json'),
    () => eslintJson
  );

  const installTask = await addDependenciesToPackageJson(
    host,
    {}, //extraEslintDependencies.dependencies,
    {}, // extraEslintDependencies.devDependencies
  );
  tasks.push(installTask);

  return runTasksInSerial(...tasks);
}

export default async function (host: Tree, options: Vue3ViteGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options);
  const { projectRoot } = normalizedOptions;

  addProjectConfiguration(host, normalizedOptions.projectName, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      build: {
        executor: 'nx-vue3-vite:build-app',
      },
      serve: {
        executor: 'nx-vue3-vite:dev-server',
      },
      test: {
        executor: '@nrwl/jest:jest',
        outputs: ['coverage/apps/web-vue3-vite'],
        options: {
          jestConfig: 'apps/web-vue3-vite/jest.config.js',
          passWithNoTests: true
        }
      },
      lint: {
        executor: '@nrwl/linter:eslint',
        options: { // TODO -- remove
          lintFilePatterns: [`${projectRoot}/**/*.{js,jsx,ts,tsx,vue}`],
        },
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  const depsTask = updateDependencies(host);

  addFiles(host, normalizedOptions);
  const lintTask = await addLinting(host, normalizedOptions);

  addPackageWithInit('@nrwl/jest');
  await formatFiles(host);
  return runTasksInSerial(
    depsTask,
    lintTask,
  );
}
