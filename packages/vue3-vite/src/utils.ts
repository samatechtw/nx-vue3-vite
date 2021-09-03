import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';

export function getProjectRoot(context: ExecutorContext): string {
  if (context.projectName) {
    return joinPathFragments(context.root, projectRelativePath(context));
  }
  return context.root;
}

export function projectRelativePath(context: ExecutorContext): string {
  return context.workspace.projects[context.projectName].root;
}
