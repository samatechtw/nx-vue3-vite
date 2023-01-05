import { PathAlias } from '../../util/path-alias';
import { TestFramework } from '../../util/test-framework';

export interface Vue3ViteGeneratorSchema {
  name: string;
  title?: string;
  tags?: string;
  directory?: string;
  alias?: PathAlias;
  test?: TestFramework;
}
