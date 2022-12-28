import { Tree, readProjectConfiguration, readJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import generator from './generator';
import { LibraryGeneratorSchema } from './schema';

describe('vue3-vite library generator', () => {
  let appTree: Tree;
  const options: LibraryGeneratorSchema = { name: 'test' };

  beforeEach(async () => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);

    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();

    expect(Object.keys(config.targets)).toEqual([
      'build',
      'e2e',
      'lint',
      'test',
    ]);
  });

  describe('updates `tsconfig.base.json`', () => {
    it('should create tsconfig.base.json if it does not exist', async () => {
      // Remove the default `tsconfig.base.json` before generation
      appTree.delete('tsconfig.base.json');

      // Run generator
      await generator(appTree, options);

      // Check if `tsconfig.base.json` is generated correctly.
      // `paths` property will be verified in the test case below.
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
        },
        exclude: ['node_modules', 'tmp'],
      });
    });

    it('should add path to `tsconfigBaseJson.compilerOptions.paths`', async () => {
      // Run generator
      await generator(appTree, options);

      // Evaluate key and path
      const { npmScope } = readJson(appTree, 'nx.json');
      const key = `@${npmScope}/${options.name}`;
      const path = `libs/${options.name}/src/index.ts`;

      // Check if path is added to `tsconfigBaseJson.compilerOptions.paths` correctly
      const tsConfigBaseJson = readJson(appTree, 'tsconfig.base.json');
      const { paths } = tsConfigBaseJson.compilerOptions;
      expect(paths[key]).toEqual([path]);
    });
  });
});
