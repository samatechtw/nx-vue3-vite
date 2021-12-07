import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { Vue3ViteGeneratorSchema } from './schema';

describe('vue3-vite generator', () => {
  let appTree: Tree;
  const options: Vue3ViteGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should generate files', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();

    expect(Object.keys(config.targets)).toEqual([
      'build',
      'serve',
      'e2e',
      'lint',
      'test',
    ]);
  });
});
