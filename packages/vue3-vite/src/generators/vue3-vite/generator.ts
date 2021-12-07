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
import * as path from 'path';
import { Vue3ViteGeneratorSchema } from './schema';
import {
  ProjectDevDependencies,
  ProjectDependencies,
  VSCodeExtensionsFilePath,
  recommendedExtensions,
} from '../../defaults';
import { addJest, updateDependencies, runTasksInSerial } from '../../utils';
import { jestInitGenerator } from '@nrwl/jest';

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
    ? names(options.directory).fileName
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectTitle = options.title || projectName;
  const projectRoot = joinPathFragments(
    getWorkspaceLayout(host).appsDir,
    projectDirectory
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
  const { projectRoot, projectName } = normalizedOptions;

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
        executor: '@nrwl/linter:eslint',
        options: {
          lintFilePatterns: [`${projectRoot}/**/*.{js,jsx,ts,tsx,vue}`],
        },
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  const depsTask = updateDependencies(
    host,
    ProjectDependencies,
    ProjectDevDependencies
  );

  addFiles(host, normalizedOptions);

  updateExtensionRecommendations(host);

  const jestInit = jestInitGenerator(host, {});
  const jestTask = await addJest(host, projectName);
  await formatFiles(host);

  return runTasksInSerial(jestInit, jestTask, depsTask);
}
