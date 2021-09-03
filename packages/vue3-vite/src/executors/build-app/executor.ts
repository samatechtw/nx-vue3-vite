import {
  ExecutorContext,
  joinPathFragments,
  offsetFromRoot,
} from '@nrwl/devkit';
import { build } from 'vite';
import { getProjectRoot, projectRelativePath } from '../../utils';
import { BuildAppExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildAppExecutorSchema,
  context: ExecutorContext
) {
  const projectRoot = getProjectRoot(context);
  const projectRelative = projectRelativePath(context);
  const workspaceRoot = offsetFromRoot(projectRelative);

  console.log('Building', context.projectName || '<?>');

  const dist = options.dist ?? './dist';
  const outDir = joinPathFragments(workspaceRoot, dist);

  console.log('...output to', outDir);

  await build({
    root: projectRoot,
    build: {
      outDir,
    },
  });
  return {
    success: true,
  };
}
