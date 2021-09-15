import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  joinPathFragments,
  updateJson,
} from '@nrwl/devkit';
import { addPackageWithInit } from '@nrwl/workspace';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import * as path from 'path';
import { Vue3ViteGeneratorSchema } from './schema';
import {
  LibraryDevDependencies,
  LibraryDependencies,
  VSCodeExtensionsFilePath,
  recommendedExtensions,
} from '../../defaults';
import { updateDependencies } from '../../utils';

interface NormalizedSchema extends Vue3ViteGeneratorSchema {
  libraryName: string;
  libraryRoot: string;
  libraryDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  host: Tree,
  options: Vue3ViteGeneratorSchema
): NormalizedSchema {
  const { fileName, name } = names(options.name);
  const libraryDirectory = options.directory
    ? names(options.directory).fileName
    : fileName;
  const libraryRoot = joinPathFragments(
    getWorkspaceLayout(host).libsDir,
    libraryDirectory
  );
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    libraryName: name,
    libraryRoot,
    libraryDirectory,
    parsedTags,
  };
}

function addFiles(host: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.libraryRoot),
    // Hack for copying dotfiles - use as a template in the filename
    // e.g. "__dot__eslintrc.js" => ".eslintrc.js"
    dot: '.',
    template: '',
  };
  generateFiles(
    host,
    path.join(__dirname, 'files'),
    options.libraryRoot,
    templateOptions
  );
}

function updateExtensionRecommendations(host: Tree) {
  if (!host.exists(VSCodeExtensionsFilePath)) {
    host.write(VSCodeExtensionsFilePath, '{ "recommendations": [] }');
  }

  updateJson(host, VSCodeExtensionsFilePath, (json) => {
    json.recommendations ??= [];
    for (const extension of recommendedExtensions) {
      if (
        Array.isArray(json.recommendations) &&
        !json.recommendations.includes(extension)
      )
        json.recommendations.push(extension);
    }
    return json;
  });
}

export default async function (host: Tree, options: Vue3ViteGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options);
  const { libraryRoot } = normalizedOptions;

  addProjectConfiguration(host, normalizedOptions.libraryName, {
    root: libraryRoot,
    projectType: 'library',
    sourceRoot: joinPathFragments(libraryRoot, 'src'),
    targets: {
      build: {
        executor: 'nx-vue3-vite:build-app',
        options: {
          dist: joinPathFragments('dist', libraryRoot),
        },
      },
      test: {
        executor: '@nrwl/jest:jest',
        outputs: [joinPathFragments('coverage', libraryRoot)],
        options: {
          jestConfig: joinPathFragments(libraryRoot, 'jest.config.ts'),
          passWithNoTests: true,
        },
      },
      e2e: {
        executor: 'nx-vue3-vite:cypress',
        options: {
          cypressConfig: joinPathFragments(libraryRoot, 'cypress.json'),
          testingType: 'component',
        },
      },
      lint: {
        executor: '@nrwl/linter:eslint',
        options: {
          lintFilePatterns: [`${libraryRoot}/**/*.{js,jsx,ts,tsx,vue}`],
        },
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  const depsTask = updateDependencies(
    host,
    LibraryDependencies,
    LibraryDevDependencies
  );

  addFiles(host, normalizedOptions);

  updateExtensionRecommendations(host);

  addPackageWithInit('@nrwl/jest');
  await formatFiles(host);

  return runTasksInSerial(depsTask);
}
