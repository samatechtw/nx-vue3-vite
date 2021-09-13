import { ExecutorContext } from '@nrwl/devkit';
import { DevServerExecutorSchema } from './schema';
import { createServer } from 'vite';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';

export default async function* runExecutor(
  options: DevServerExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for DevServer', options);
  const workspaceRoot = getWorkspaceRoot(context);

  const projectRoot = getProjectRoot(context);
  const { host, port, https } = options;
  const protocol = https ? 'https' : 'http';
  let server = await createServer({
    root: projectRoot,
    server: {
      port,
      host,
      fs: {
        allow: [workspaceRoot],
      },
    },
  });
  server = await server.listen();
  yield {
    success: true,
    baseUrl: `${protocol}://${host}:${port}`,
  };
  return new Promise<{ success: boolean; baseUrl: string }>((res) => {
    server.httpServer.on('close', () => {
      res({
        success: true,
        baseUrl: `${protocol}://${host}:${port}`,
      });
    });
  });
}
