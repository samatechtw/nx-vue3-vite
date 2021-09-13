export interface CypressExecutorOptions {
  baseUrl: string;
  cypressConfig: string;
  devServerTarget: string;
  headless: boolean;
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
