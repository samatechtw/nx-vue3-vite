import {
  ExecutorContext,
  joinPathFragments,
  offsetFromRoot,
} from '@nrwl/devkit';
import { build } from 'vitepress';
import { getProjectRoot, projectRelativePath } from '../../utils';
import { BuildDocsExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildDocsExecutorSchema,
  context: ExecutorContext
) {
  const projectRoot = joinPathFragments(getProjectRoot(context), options.docs);
  const projectRelative = projectRelativePath(context);
  const workspaceRoot = offsetFromRoot(projectRelative);

  console.log('Building', context.projectName || '<?>');

  const dist = options.dist ?? './dist';
  const outDir = joinPathFragments(workspaceRoot, dist);

  console.log('...output to', outDir);
  await build(projectRoot, {
    outDir,
  });
  return {
    success: true,
  };
}
