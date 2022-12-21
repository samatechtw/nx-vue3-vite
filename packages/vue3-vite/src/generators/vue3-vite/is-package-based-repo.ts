import { Tree, readJson } from '@nrwl/devkit';

// Package-based repositories usually have `"workspaces": ["packages/*"]` in package.json.
// This may not be a reliable way to detect repository type
// TODO - Find an official solution to tell if a NX repo is package-based or integrated.
export const isPackageBasedRepo = (tree: Tree): boolean => {
  const packageJson = readJson(tree, 'package.json');
  return Array.isArray(packageJson.workspaces);
};
