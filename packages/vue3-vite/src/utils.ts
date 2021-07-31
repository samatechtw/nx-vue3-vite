import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';

export function getProjectRoot(context: ExecutorContext): string {
  if(context.projectName) {
    return joinPathFragments(context.root, context.workspace.projects[context.projectName].root);
  }
  return context.root;
}