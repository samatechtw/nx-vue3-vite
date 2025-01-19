import path from 'path';
import fs from 'fs';

const offsetToFile = (
  searchPath: string,
  configName = 'tsconfig.base.json',
): string | undefined => {
  let offset = './';
  let prevConfigPath = '';
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const configPath = path.join(searchPath, offset, configName);
    if (fs.existsSync(configPath)) {
      return offset;
      // Exit if we've reached the FS root
    } else if (configPath === prevConfigPath) {
      return undefined;
    }
    offset += '../';
    prevConfigPath = configPath;
  }
};

export const tsconfigBaseAliases = (
  fromPath: string,
): Record<string, string> => {
  const resolve = (p: string): string => path.resolve(fromPath, p);

  const aliases: Record<string, string> = {};
  const rootOffset = offsetToFile(fromPath);
  if (!rootOffset) {
    return aliases;
  }
  const tsconfigPath = path.join(fromPath, rootOffset, 'tsconfig.base.json');
  const tsconfigBase = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

  const paths: Record<string, string> =
    tsconfigBase.compilerOptions?.paths || {};
  for (const [name, path] of Object.entries(paths)) {
    const simplePath = path[0].replace('/*', '/');
    const relative = `${rootOffset}${simplePath}`;
    if (name.includes('/*')) {
      const resolved = `${resolve(relative)}/`;
      aliases[name.replace('/*', '/')] = resolved;
    } else {
      aliases[name] = resolve(relative);
    }
  }
  return aliases;
};
