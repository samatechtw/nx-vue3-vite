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
  joinPathFragments,
} from '@nrwl/devkit';
import { addPackageWithInit } from '@nrwl/workspace';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import * as path from 'path';
import { Vue3ViteGeneratorSchema } from './schema';
import { DevDependencies, Dependencies } from '../../defaults';

interface NormalizedSchema extends Vue3ViteGeneratorSchema {
  projectName: string;
  projectTitle: string;
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
  const projectTitle = options.title || projectName;
  const projectRoot = joinPathFragments(
    getWorkspaceLayout(host).appsDir,
    projectDirectory,
  );
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectTitle,
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
    // Hack for copying dotfiles - use as a template in the filename
    // e.g. "__dot__eslintrc.js" => ".eslintrc.js"
    dot: '.',
    template: '',
  };
  generateFiles(
    host,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions,
  );
}

function updateDependencies(host: Tree) {
  // Make sure we don't have dependency duplicates
  const deps = Object.keys(Dependencies);
  const devDeps = Object.keys(Dependencies);
  removeDependenciesFromPackageJson(host, devDeps, deps);
  return addDependenciesToPackageJson(host, Dependencies, DevDependencies);
}

export default async function (host: Tree, options: Vue3ViteGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options);
  const { projectRoot } = normalizedOptions;

  addProjectConfiguration(host, normalizedOptions.projectName, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: joinPathFragments(projectRoot, 'src'),
    targets: {
      build: {
        executor: 'nx-vue3-vite:build-app',
        options: {
          dist: joinPathFragments('dist', projectRoot),
        },
      },
      serve: {
        executor: 'nx-vue3-vite:dev-server',
      },
      test: {
        executor: '@nrwl/jest:jest',
        outputs: [joinPathFragments('coverage', projectRoot)],
        options: {
          jestConfig: joinPathFragments(projectRoot, 'jest.config.ts'),
          passWithNoTests: true
        }
      },
      lint: {
        executor: '@nrwl/linter:eslint',
        options: {
          lintFilePatterns: [`${projectRoot}/**/*.{js,jsx,ts,tsx,vue}`],
        },
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  const depsTask = updateDependencies(host);

  addFiles(host, normalizedOptions);

  addPackageWithInit('@nrwl/jest');
  await formatFiles(host);

  // Move vetur.config.js to the workspace root: https://vuejs.github.io/vetur/guide/setup.html#advanced
  const veturDest =  './vetur.config.js';
  const veturSrc = joinPathFragments(projectRoot, veturDest);
  host.rename(veturSrc, veturDest);

  return runTasksInSerial(
    depsTask,
  );
}
