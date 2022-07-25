import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import { PreviewServer, preview } from 'vite';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';
import { PreviewServerExecutorSchema } from './schema';
import { DevServerLogger, createLogger } from '../../custom-logger';
import { waitServerClose } from '../../server-utils';

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
  const { host, port, https, mode, dist } = options;
  const protocol = https ? 'https' : 'http';

  const outDir = joinPathFragments(workspaceRoot, dist);

  const server = await preview({
    preview: {
      port,
      host,
    },
    build: {
      outDir,
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

export default async function* runExecutor(
  options: PreviewServerExecutorSchema,
  context: ExecutorContext
) {
  const urlHttps = options.https ? 'https' : 'http';
  const urlPort = options.port ? `:${options.port}` : '';
  const url = `${urlHttps}://${options.host}${urlPort}`;

  if (!options.dist) {
    throw new Error('options.dist is required');
  }

  console.log(`Previewing build output directory: ${options.dist} at ${url}`);
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
