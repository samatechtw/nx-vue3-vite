export interface CypressExecutorOptions {
  baseUrl: string;
  cypressConfig: string;
  devServerTarget: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  devServerOptions: { [k: string]: any };
  headless: boolean;
  headlessWatch: boolean;
  headlessCI: boolean;
  exit: boolean;
  parallel: boolean;
  record: boolean;
  key?: string;
  tsConfig: string;
  browser?: string;
  env?: Record<string, string>;
  spec?: string;
  ciBuildId?: string;
  group?: string;
  ignoreTestFiles?: string;
  reporter?: string;
  reporterOptions?: string;
  skipServe: boolean;
  testingType?: 'component' | 'e2e';
}
