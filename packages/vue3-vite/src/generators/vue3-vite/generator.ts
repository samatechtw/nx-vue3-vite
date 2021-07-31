import {
  addProjectConfiguration,
  addDependenciesToPackageJson,
  removeDependenciesFromPackageJson,
  readJson,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { Vue3ViteGeneratorSchema } from './schema';
import { DevDependencies, Dependencies } from '../../defaults';

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
  console.log('ADD DEPS', Dependencies);
  return addDependenciesToPackageJson(host, Dependencies, DevDependencies);
}

export default async function (host: Tree, options: Vue3ViteGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options);

  addProjectConfiguration(host, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'application',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@samatech/vue3-vite:build-app',
      },
      serve: {
        executor: '@samatech/vue3-vite:dev-server',
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  addFiles(host, normalizedOptions);
  await formatFiles(host);
  return updateDependencies(host);
}
