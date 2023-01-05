import { PathAlias } from '../../util/path-alias';
import { TestFramework } from '../../util/test-framework';

export interface LibraryGeneratorSchema {
  name: string;
  pascalCaseFiles?: boolean;
  tags?: string;
  directory?: string;
  alias?: PathAlias;
  test?: TestFramework;
}
