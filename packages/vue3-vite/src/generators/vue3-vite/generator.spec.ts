import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration, readJson } from '@nrwl/devkit';
import generator from './generator';
import { Vue3ViteGeneratorSchema } from './schema';

describe('vue3-vite generator', () => {
  let appTree: Tree;
  const options: Vue3ViteGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
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

  it('should create tsconfig.base.json if it does not exist', async () => {
    // Remove the default tsconfig.base.json before generation
    appTree.delete('tsconfig.base.json');

    // Run generator
    await generator(appTree, options);

    // Check if tsconfig.base.json is generated correctly
    const tsConfigBaseJson = readJson(appTree, 'tsconfig.base.json');
    expect(tsConfigBaseJson).toMatchObject({
      compileOnSave: false,
      compilerOptions: {
        rootDir: '.',
        sourceMap: true,
        declaration: false,
        moduleResolution: 'node',
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        importHelpers: true,
        resolveJsonModule: true,
        target: 'es2015',
        module: 'esnext',
        lib: ['es2017', 'dom'],
        skipLibCheck: true,
        skipDefaultLibCheck: true,
        baseUrl: '.',
        paths: {},
      },
      exclude: ['node_modules', 'tmp'],
    });
  });
});
