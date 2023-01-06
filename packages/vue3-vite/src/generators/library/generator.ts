import * as path from 'path';
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
  readJson,
} from '@nrwl/devkit';
import { LibraryGeneratorSchema } from './schema';
import {
  LibraryDevDependencies,
  LibraryDependencies,
  VSCodeExtensionsFilePath,
  recommendedExtensions,
} from '../../util/defaults';
import {
  getCaseAwareFileName,
  parseTags,
  updateDependencies,
} from '../../util/utils';
import { extractLayoutDirectory } from '@nrwl/devkit';
import { PathAlias } from '../../util/path-alias';
import { TestFramework } from '../../util/test-framework';
import { generateTestTarget } from '../../util/generate-test-target';

interface NormalizedSchema extends LibraryGeneratorSchema {
  fileName: string;
  libraryName: string;
  libraryRoot: string;
  libraryDirectory: string;
  parsedTags: string[];
  useLocalAlias: boolean;
  testFramework: TestFramework;
}

function normalizeOptions(
  host: Tree,
  options: LibraryGeneratorSchema
): NormalizedSchema {
  const { layoutDirectory, projectDirectory: libraryDirectory } =
    extractLayoutDirectory(options.directory);
  const { libsDir: defaultLibsDir } = getWorkspaceLayout(host);
  const libsDir = layoutDirectory ?? defaultLibsDir;

  const name = names(options.name).fileName;
  const fullLibraryDirectory = libraryDirectory
    ? `${names(libraryDirectory).fileName}/${name}`
    : name;

  const libraryName = fullLibraryDirectory.replace(new RegExp('/', 'g'), '-');
  const fileName = getCaseAwareFileName({
    fileName: libraryName,
    pascalCaseFiles: options.pascalCaseFiles,
  });
  const libraryRoot = joinPathFragments(libsDir, fullLibraryDirectory);

  const parsedTags = parseTags(options.tags);
  // Default to global paths
  const useLocalAlias = options.alias === PathAlias.Local;
  // Default to vitest
  const testFramework = options.test || TestFramework.Vitest;

  return {
    ...options,
    fileName,
    libraryName: name,
    libraryRoot,
    libraryDirectory,
    parsedTags,
    useLocalAlias,
    testFramework,
  };
}

function ensureRootFiles(host: Tree, options: NormalizedSchema) {
  // Ensure `tsconfig.base.json`
  if (!host.exists('tsconfig.base.json')) {
    generateFiles(host, path.join(__dirname, 'root-files/tsconfig'), '', {});
  }
  // Add path to `tsconfig.base.json`
  updateJson(host, 'tsconfig.base.json', (json) => {
    // Ensure `compilerOptions`
    if (!json.compilerOptions) {
      json.compilerOptions = {};
    }
    // resolveJsonModule required for vite.config.ts aliasing
    json.compilerOptions.resolveJsonModule = true;

    // Add path to `compilerOptions.paths`
    if (!json.compilerOptions.paths) {
      json.compilerOptions.paths = {};
    }
    const { npmScope } = readJson(host, 'nx.json');
    const key = `@${npmScope}/${options.libraryName}`;
    json.compilerOptions.paths[key] = [`${options.libraryRoot}/src/index.ts`];

    return json;
  });
}

function addFiles(host: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.fileName),
    offsetFromRoot: offsetFromRoot(options.libraryRoot),
    libraryRoot: options.libraryRoot,
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
  const { libraryRoot, libraryName, testFramework } = normalizedOptions;

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
      test: generateTestTarget(libraryRoot, testFramework),
    },
    tags: normalizedOptions.parsedTags,
  });

  ensureRootFiles(host, normalizedOptions);
  addFiles(host, normalizedOptions);

  const depsTask = updateDependencies(
    host,
    LibraryDependencies,
    LibraryDevDependencies
  );

  updateExtensionRecommendations(host);

  await formatFiles(host);

  return depsTask;
}
