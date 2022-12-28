import { PathAlias } from './path-alias';

export interface Vue3ViteGeneratorSchema {
  name: string;
  title?: string;
  tags?: string;
  directory?: string;
  path?: PathAlias;
}
