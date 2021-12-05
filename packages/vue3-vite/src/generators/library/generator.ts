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
  installPackagesTask,
} from '@nrwl/devkit';
import * as path from 'path';
import { LibraryGeneratorSchema } from './schema';
import {
  LibraryDevDependencies,
  LibraryDependencies,
  VSCodeExtensionsFilePath,
  recommendedExtensions,
} from '../../defaults';
import { addJest, updateDependencies } from '../../utils';

interface NormalizedSchema extends LibraryGeneratorSchema {
  libraryName: string;
  libraryRoot: string;
  libraryDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  host: Tree,
  options: LibraryGeneratorSchema
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

export default async function (host: Tree, options: LibraryGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options);
  const { libraryRoot, libraryName } = normalizedOptions;

  addProjectConfiguration(host, libraryName, {
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

  addFiles(host, normalizedOptions);

  updateDependencies(host, LibraryDependencies, LibraryDevDependencies);

  updateExtensionRecommendations(host);

  await formatFiles(host);

  const jestTask = await addJest(host, libraryName);
  installPackagesTask(host);
  return jestTask;
}
