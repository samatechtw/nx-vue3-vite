import { Tree, readJson } from '@nrwl/devkit';

export const isPackageBasedRepo = (tree: Tree): boolean => {
  const packageJson = readJson(tree, 'package.json');
  return Array.isArray(packageJson.workspaces);
};
