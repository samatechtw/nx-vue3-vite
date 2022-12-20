import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import appGenerator from '../vue3-vite/generator';
import generator from './generator';
import { ComponentGeneratorSchema } from './schema';

describe('component generator', () => {
  let appTree: Tree;
  const projectName = 'test-project';
  const options: ComponentGeneratorSchema = {
    name: 'test',
    project: projectName,
    scoped: false,
    setup: true,
    style: 'postcss',
    lang: 'ts',
  };

  beforeEach(async () => {
    appTree = createTreeWithEmptyWorkspace();
    await appGenerator(appTree, { name: projectName });
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, projectName);
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
