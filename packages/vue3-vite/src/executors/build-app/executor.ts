import { ExecutorContext } from '@nrwl/devkit';
import { createDirectory } from '@nrwl/workspace';
import { build } from 'vite';
import { getProjectRoot } from '../../utils';
import { BuildAppExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildAppExecutorSchema,
  context: ExecutorContext,
) {
  const root = getProjectRoot(context);
  console.log('Building', context.projectName || '<?>');
  const dist = options.dist ?? './dist';
  createDirectory(`${root}${dist}`);
  await build({
    root,
    build: {
      // Build options
    }
  });
  return {
    success: true,
  };
}
