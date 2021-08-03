import { ExecutorContext } from '@nrwl/devkit';
import { DevServerExecutorSchema } from './schema';
import { createServer } from 'vite';
import { getProjectRoot } from '../../utils';

export default async function runExecutor(
  options: DevServerExecutorSchema,
  context: ExecutorContext,
) {
  console.log('Executor ran for DevServer', options);
  const root = getProjectRoot(context);
  const { host, port, https } = options;
  const protocol = https ? 'https': 'http';
  let server = await createServer({
    root,
    server: {
      port,
      host,
    },
  });
  server = await server.listen();
  return new Promise<{ success: boolean, baseUrl: string }>((res) => {
    server.httpServer.on('close', () => {
      res({
        success: true ,
        baseUrl: `${protocol}://${host}:${port}`,
      });
    });
  });
}
