import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot,
  Tree,
  joinPathFragments,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { Vue3ViteGeneratorSchema } from './schema';
import {
  ProjectDevDependencies,
  ProjectDependencies,
  VSCodeExtensionsFilePath,
  recommendedExtensions,
  JestDevDependencies,
  VitestDevDependencies,
} from '../../util/defaults';
import {
  getAppsDir,
  parseTags,
  updateDependencies,
  updateScripts,
} from '../../util/utils';
import { PathAlias } from '../../util/path-alias';
import { TestFramework } from '../../util/test-framework';
import { generateTestTarget } from '../../util/generate-test-target';

interface NormalizedSchema extends Vue3ViteGeneratorSchema {
  projectName: string;
  projectTitle: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  useLocalAlias: boolean;
  testFramework: TestFramework;
}

function normalizeOptions(
  host: Tree,
  options: Vue3ViteGeneratorSchema,
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? names(options.directory).fileName
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectTitle = options.title || projectName;
  const projectRoot = joinPathFragments(getAppsDir(host), projectDirectory);
  const parsedTags = parseTags(options.tags);
  // Default to global paths
  const useLocalAlias = options.alias === PathAlias.Local;
  // Default to vitest
  const testFramework = options.test || TestFramework.Vitest;

  return {
    ...options,
    projectName,
    projectTitle,
    projectRoot,
    projectDirectory,
    parsedTags,
    useLocalAlias,
    testFramework,
  };
}

function makeAssetPath(useLocalAlias: boolean) {
  return (localRoot: string) =>
    useLocalAlias ? '@assets' : `${localRoot}/assets`;
}

function makeAppPath(useLocalAlias: boolean) {
  return (localRoot: string) => (useLocalAlias ? '@app' : localRoot);
}

function addFiles(host: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    projectRoot: options.projectRoot,
    assetPath: makeAssetPath(options.useLocalAlias),
    appPath: makeAppPath(options.useLocalAlias),
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

function ensureRootFiles(host: Tree) {
  // Ensure `tsconfig.base.json`
  if (!host.exists('tsconfig.base.json')) {
    generateFiles(host, path.join(__dirname, 'root-files/tsconfig'), '', {});
  }
  updateJson(host, 'tsconfig.base.json', (json) => {
    // Ensure `compilerOptions`
    if (!json.compilerOptions) {
      json.compilerOptions = {};
    }
    // resolveJsonModule required for vite.config.ts aliasing
    json.compilerOptions.resolveJsonModule = true;
    return json;
  });
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
  const { projectRoot, projectName, testFramework } = normalizedOptions;

  addProjectConfiguration(host, projectName, {
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
      e2e: {
        executor: 'nx-vue3-vite:cypress',
        options: {
          cypressConfig: joinPathFragments(projectRoot, 'cypress.json'),
          testingType: 'component',
        },
      },
      lint: {
        executor: '@nx/eslint:lint',
        options: {
          lintFilePatterns: [`${projectRoot}/**/*.{js,jsx,ts,tsx,vue}`],
        },
      },
      test: generateTestTarget(projectRoot, testFramework, projectName),
    },
    tags: normalizedOptions.parsedTags,
  });

  const testDevDependencies =
    testFramework === TestFramework.Jest
      ? JestDevDependencies
      : VitestDevDependencies;

  const devDependencies = {
    ...ProjectDevDependencies,
    ...testDevDependencies,
  };

  const depsTask = updateDependencies(
    host,
    ProjectDependencies,
    devDependencies,
  );
  updateScripts(host, { nx: 'nx' });

  ensureRootFiles(host);
  addFiles(host, normalizedOptions);

  updateExtensionRecommendations(host);

  await formatFiles(host);

  return depsTask;
}
