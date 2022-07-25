import { ExecutorContext } from '@nrwl/devkit';
import { createServer, ViteDevServer } from 'vite';
import { DevServerExecutorSchema } from './schema';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';
import { waitServerClose } from '../../server-utils';
import { DevServerLogger, createLogger } from '../../custom-logger';

interface DevExecutorResult {
  server: ViteDevServer;
  success: boolean;
  baseUrl?: string;
}

const restartServer = async (
  options: DevServerExecutorSchema,
  context: ExecutorContext,
  customLogger: DevServerLogger
): Promise<DevExecutorResult> => {
  const workspaceRoot = getWorkspaceRoot(context);
  const projectRoot = getProjectRoot(context);
  const { host, port, https, mode } = options;
  const protocol = https ? 'https' : 'http';

  let server = await createServer({
    root: projectRoot,
    mode,
    customLogger,
    server: {
      port,
      host,
      fs: {
        allow: [workspaceRoot],
      },
    },
  });
  server = await server.listen();
  return {
    server,
    success: true,
    baseUrl: `${protocol}://${host}:${port}`,
  };
};

export default async function* runExecutor(
  options: DevServerExecutorSchema,
  context: ExecutorContext
) {
  const urlHttps = options.https ? 'https' : 'http';
  const urlPort = options.port ? `:${options.port}` : '';
  const url = `${urlHttps}://${options.host}${urlPort}`;
  console.log(`Running Vite Dev server: ${url}`);
  console.log(`  mode = ${options.mode}`);

  const customLogger = createLogger();
  const result = await restartServer(options, context, customLogger);

  const { success, baseUrl, server } = result;
  yield { success, baseUrl };

  while (true) {
    const closed = await waitServerClose(server, customLogger);
    if (closed) {
      return { success: true };
    }

    yield { success, baseUrl };
  }
}
