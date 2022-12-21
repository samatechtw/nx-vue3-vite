import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, writeJson, readJson } from '@nrwl/devkit';
import { isPackageBasedRepo } from './is-package-based-repo';

describe('isPackageBasedRepo', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should return false when "workspaces" property does not exist in package.json', async () => {
    const result = isPackageBasedRepo(appTree);
    expect(result).toEqual(false);
  });

  it('should return true when "workspaces" in package.json is an array', async () => {
    // Add "workspaces" property in package.json
    const packageJson = readJson(appTree, 'package.json');
    packageJson.workspaces = ['packages/*'];
    writeJson(appTree, 'package.json', packageJson);

    // Verify result
    const result = isPackageBasedRepo(appTree);
    expect(result).toEqual(true);
  });
});
