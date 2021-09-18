import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import fs from 'fs';
import { build } from 'vitepress';
import { getProjectRoot, projectRelativePath } from '../../utils';
import { BuildDocsExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildDocsExecutorSchema,
  context: ExecutorContext
) {
  const projectRoot = joinPathFragments(getProjectRoot(context), options.root);
  const projectRelative = projectRelativePath(context);

  console.log('Building', context.projectName || '<?>');

  const dist = options.dist ?? joinPathFragments('dist', projectRelative);

  const defaultOutDir = joinPathFragments(projectRoot, '.vitepress', 'dist');

  console.log('...output to', dist);
  await build(projectRoot);

  // Hack to work around Vitepress build not respecting outDir
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true });
  }
  fs.renameSync(defaultOutDir, dist);

  return {
    success: true,
  };
}
