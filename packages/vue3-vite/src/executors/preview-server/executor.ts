import { ExecutorContext } from '@nrwl/devkit';
import { PreviewServer, preview } from 'vite';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';
import { PreviewServerExecutorSchema } from './schema';
import { DevServerLogger, createLogger } from './customLogger';

interface PreviewExecutorResult {
  server: PreviewServer;
  success: boolean;
  baseUrl?: string;
}

const restartServer = async (
  options: PreviewServerExecutorSchema,
  context: ExecutorContext,
  customLogger: DevServerLogger
): Promise<PreviewExecutorResult> => {
  const workspaceRoot = getWorkspaceRoot(context);
  const projectRoot = getProjectRoot(context);
  const { host, port, https, mode, buildOutDir } = options;
  const protocol = https ? 'https' : 'http';

  const server = await preview({
    preview: {
      port,
      host,
    },
    build: {
      outDir: buildOutDir,
      emptyOutDir: true,
    },
    root: projectRoot,
    mode,
    customLogger,
    server: {
      fs: {
        allow: [workspaceRoot],
      },
    },
  });

  return {
    server,
    success: true,
    baseUrl: `${protocol}://${host}:${port}`,
  };
};

const waitServerClose = async (
  server: PreviewServer,
  customLogger: DevServerLogger
): Promise<boolean> => {
  return new Promise<boolean>((res) => {
    server.httpServer.on('error', (err) => {
      console.log('Vite error', err);
    });
    server.httpServer.on('close', async () => {
      if (customLogger.serverRestarted) {
        console.log('Vite full page reload');
        customLogger.serverRestarted = true;
        res(false);
      } else {
        console.log('Vite closed');
        res(true);
      }
    });
  });
};

export default async function* runExecutor(
  options: PreviewServerExecutorSchema,
  context: ExecutorContext
) {
  const urlHttps = options.https ? 'https' : 'http';
  const urlPort = options.port ? `:${options.port}` : '';
  const url = `${urlHttps}://${options.host}${urlPort}`;

  if (!options.buildOutDir) {
    throw new Error('options.buildOutDir is required');
  }

  console.log(`Previewing build output: ${options.buildOutDir} at ${url}`);
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
