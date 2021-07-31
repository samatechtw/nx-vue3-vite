import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import { createDirectory, getProjectConfig, getWorkspacePath } from '@nrwl/workspace';
import { build } from 'vite';
import { BuildAppExecutorSchema } from './schema';

export function getProjectRoot(context: ExecutorContext): string {
  if(context.projectName) {
    return joinPathFragments(context.root, context.workspace.projects[context.projectName].root);
  }
  return context.root;
}

export default async function runExecutor(
  options: BuildAppExecutorSchema,
  context: ExecutorContext,
) {
  const root = getProjectRoot(context);
  console.log('Building', context.projectName || '<?>');
  console.log('ROOT:', root);
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
