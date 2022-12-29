import { PathAlias } from './path';

export interface Vue3ViteGeneratorSchema {
  name: string;
  title?: string;
  tags?: string;
  directory?: string;
  alias?: PathAlias;
}
