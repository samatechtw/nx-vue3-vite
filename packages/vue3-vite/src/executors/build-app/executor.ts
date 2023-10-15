import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import { build } from 'vite';
import { getProjectRoot, getWorkspaceRoot } from '../../util/utils';
import { BuildAppExecutorSchema } from './schema';
import { copyPackageJsonPlugin } from '../../external';

export default async function runExecutor(
  options: BuildAppExecutorSchema,
  context: ExecutorContext,
) {
  const projectRoot = getProjectRoot(context);
  const workspaceRoot = getWorkspaceRoot(context);

  console.log('Building', context.projectName || '<?>');
  console.log(`  mode = ${options.mode}`);

  const dist = options.dist ?? './dist';
  const outDir = joinPathFragments(workspaceRoot, dist);

  let minify: 'terser' | 'esbuild' | boolean;
  if (options.minify === 'terser' || options.minify === 'esbuild') {
    minify = options.minify;
  } else {
    minify = false;
  }

  console.log('...output to', outDir);

  await build({
    root: projectRoot,
    mode: options.mode,
    build: {
      outDir,
      minify,
      rollupOptions: {
        plugins: [copyPackageJsonPlugin(projectRoot)],
      },
    },
  });
  console.log('Build complete');
  return {
    success: true,
  };
}
