import 'dotenv/config';
import { basename, dirname, join } from 'path';
import {
  ExecutorContext,
  logger,
  parseTargetString,
  runExecutor,
  stripIndents,
} from '@nx/devkit';
import { CypressExecutorOptions } from './schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import Cypress from 'cypress'; // @NOTE: Importing via ES6 messes the whole test dependencies.

export default async function cypressExecutor(
  options: CypressExecutorOptions,
  context: ExecutorContext,
) {
  options = normalizeOptions(options, context);

  let success: boolean;
  const exitOnFirstRun = options.headless && !options.headlessWatch;

  for await (const baseUrl of startDevServer(options, context)) {
    try {
      success = await runCypress(baseUrl, options);
    } catch (e) {
      logger.error(e.message);
      success = false;
    }
    if (exitOnFirstRun) {
      return { success };
    }
  }

  return { success };
}

function normalizeOptions(
  options: CypressExecutorOptions,
  context: ExecutorContext,
) {
  options.env = options.env || {};
  if (options.tsConfig) {
    const tsConfigPath = join(context.root, options.tsConfig);
    options.env.tsConfig = tsConfigPath;
    process.env.TS_NODE_PROJECT = tsConfigPath;
  }
  if (process.env.CI && options.headlessCI) {
    options.headless = true;
    options.headlessWatch = false;
  }
  checkSupportedBrowser(options);
  return options;
}

function checkSupportedBrowser({ browser }: CypressExecutorOptions) {
  // Browser was not passed as an option.
  // Cypress will use it's default and we don't need to check it
  if (!browser) {
    return;
  }

  if (browser == 'canary') {
    logger.warn(stripIndents`
  Warning:
  You are using a browser that is not supported by cypress v4+.
  Read here for more info:
  https://docs.cypress.io/guides/references/migration-guide.html#Launching-Chrome-Canary-with-browser
  `);
    return;
  }
}

async function* startDevServer(
  opts: CypressExecutorOptions,
  context: ExecutorContext,
) {
  // no dev server, return the provisioned base url
  if (!opts.devServerTarget || opts.skipServe) {
    yield opts.baseUrl;
    return;
  }

  const target = parseTargetString(opts.devServerTarget, context.projectGraph);

  for await (const output of await runExecutor<{
    success: boolean;
    baseUrl?: string;
  }>(target, opts.devServerOptions ?? {}, context)) {
    if (!output.success) {
      throw new Error('Could not compile application files');
    }
    yield opts.baseUrl || (output.baseUrl as string);
  }
}

async function runCypress(baseUrl: string, opts: CypressExecutorOptions) {
  // Cypress expects the folder where a `cypress.json` is present
  const projectFolderPath = dirname(opts.cypressConfig);
  const options: Record<string, string | boolean | Record<string, string>> = {
    project: projectFolderPath,
    configFile: basename(opts.cypressConfig),
  };

  // If not, will use the `baseUrl` normally from `cypress.json`
  if (baseUrl) {
    options.config = { baseUrl };
  }

  if (opts.browser) {
    options.browser = opts.browser;
  }

  if (opts.env) {
    options.env = opts.env;
  }
  if (opts.spec) {
    options.spec = opts.spec;
  }

  options.exit = opts.exit;
  options.headed = !opts.headless;
  options.headless = opts.headless;
  options.record = opts.record;
  options.key = opts.key;
  options.parallel = opts.parallel;
  options.ciBuildId = opts.ciBuildId;
  options.group = opts.group;
  options.ignoreTestFiles = opts.ignoreTestFiles;
  options.reporter = opts.reporter;
  options.reporterOptions = opts.reporterOptions;
  options.testingType = opts.testingType;

  /**
   * `cypress.open` returns `0` and is not of the same type as `cypress.run`.
   * `cypress.open` is the graphical UI, so it will be obvious to know what wasn't
   * working. Forcing the build to success when `cypress.open` is used.
   */
  if (opts.headless) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await Cypress.run(options)) as any;

    const finished = result.status === 'finished';
    const failures = result.totalFailed ?? 0;
    const message = finished ? '' : `, ${result.message}`;

    logger.info(
      `Cypress completed with status: ${result.status}${message} failed=${failures}`,
    );
    return failures <= 0;
  } else {
    await Cypress.open(options);
    return true;
  }
}
