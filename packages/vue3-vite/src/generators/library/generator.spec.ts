import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import generator from './generator';
import { LibraryGeneratorSchema } from './schema';

describe('vue3-vite library generator', () => {
  let appTree: Tree;
  const options: LibraryGeneratorSchema = { name: 'test' };

  beforeEach(async () => {
    appTree = createTreeWithEmptyWorkspace();
    await generator(appTree, options);
  });

  it('should run successfully', async () => {
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();

    expect(Object.keys(config.targets)).toEqual([
      'build',
      'e2e',
      'lint',
      'test',
    ]);
  });
});
