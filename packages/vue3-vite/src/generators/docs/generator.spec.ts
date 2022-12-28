import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import generator from './generator';
import { DocsGeneratorSchema } from './schema';

describe('vue3-vite generator', () => {
  let appTree: Tree;
  const options: DocsGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();

    expect(Object.keys(config.targets)).toEqual(['build', 'serve', 'lint']);
  });
});
