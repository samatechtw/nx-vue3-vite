import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, updateJson } from '@nx/devkit';
import { isPackageBasedRepo } from './is-package-based-repo';

describe('isPackageBasedRepo', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  });

  it('should return true when `packageJson.workspaces` is an array', async () => {
    // Add "workspaces" property in package.json
    updateJson(appTree, 'package.json', (json) => {
      json.workspaces = ['packages/*'];
      return json;
    });

    // Verify result
    const result = isPackageBasedRepo(appTree);
    expect(result).toEqual(true);
  });

  it('should return false when `packageJson.workspaces` is not an array', async () => {
    const result = isPackageBasedRepo(appTree);
    expect(result).toEqual(false);
  });
});
