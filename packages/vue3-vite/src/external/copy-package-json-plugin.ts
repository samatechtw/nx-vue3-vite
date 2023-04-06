import fs from 'fs';
import path from 'path';
import { OutputPlugin } from 'rollup';

/**
 * Copy `package.json` to `dist` folder if it exists.
 * @param appDir Directory path where `package.json` is located.
 */
export const copyPackageJsonPlugin = (appDir: string): OutputPlugin => ({
  name: 'copy-package-json',
  outputOptions: (options) => {
    const packageJson = path.resolve(appDir, 'package.json');
    const destination = path.resolve(options.dir ?? '', 'package.json');
    if (fs.existsSync(packageJson)) {
      if (!fs.existsSync(options.dir)) {
        fs.mkdirSync(options.dir, { recursive: true });
      }
      fs.copyFileSync(packageJson, destination);
    }
  },
});
