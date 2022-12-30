import {
  ExecutorContext,
  joinPathFragments,
  offsetFromRoot,
} from '@nrwl/devkit';
import { DevServerExecutorSchema } from './schema';
import { createServer } from 'vitepress';
import { getProjectRoot } from '../../util/utils';

export default async function runExecutor(
  options: DevServerExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for DevServer', options);
  const projectRoot = getProjectRoot(context);
  const docsRoot = joinPathFragments(projectRoot, options.root);
  const { host, port, https } = options;
  const protocol = https ? 'https' : 'http';
  let server = await createServer(docsRoot, {
    port,
    host,
    fs: {
      allow: [offsetFromRoot(projectRoot)],
    },
  });
  server = await server.listen();
  return new Promise<{ success: boolean; baseUrl: string }>((res) => {
    server.httpServer.on('close', () => {
      res({
        success: true,
        baseUrl: `${protocol}://${host}:${port}`,
      });
    });
  });
}
