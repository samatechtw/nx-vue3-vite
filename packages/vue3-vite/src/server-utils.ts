import { PreviewServer, ViteDevServer } from 'vite';
import { DevServerLogger } from './custom-logger';

export const waitServerClose = async (
  server: ViteDevServer | PreviewServer,
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
