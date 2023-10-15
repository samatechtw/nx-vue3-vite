import {
  formatFiles,
  generateFiles,
  names,
  joinPathFragments,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ComponentGeneratorSchema } from './schema';

interface NormalizedSchema extends ComponentGeneratorSchema {
  name: string;
  componentPath: string;
  scoped: boolean;
  scriptSetup: boolean;
  directory: string;
}

function normalizeOptions(
  host: Tree,
  options: ComponentGeneratorSchema,
): NormalizedSchema {
  const { sourceRoot, projectType } = readProjectConfiguration(
    host,
    options.project,
  );
  const defaultComponentRoot =
    projectType === 'library' ? 'lib' : 'app/components';
  const relPath = names(options.directory ?? defaultComponentRoot).fileName;
  const componentPath = joinPathFragments(sourceRoot, relPath);
  return {
    ...options,
    scoped: options.scoped,
    name: names(options.name).className,
    directory: options.directory,
    scriptSetup: options.setup ?? true,
    componentPath,
  };
}

function addFiles(host: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
  };
  generateFiles(
    host,
    path.join(__dirname, 'files'),
    options.componentPath,
    templateOptions,
  );
}

export default async function (host: Tree, options: ComponentGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options);
  addFiles(host, normalizedOptions);
  await formatFiles(host);
}
