import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import generator from './generator';
import { CypressGeneratorSchema } from './schema';

describe('cypress generator', () => {
  let appTree: Tree;
  const options: CypressGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
    expect(Object.keys(config.targets)).toEqual(['e2e', 'lint']);
  });
});
