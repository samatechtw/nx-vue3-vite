import readline from 'readline';
import pc from 'picocolors';
import { LogErrorOptions, Logger, LogLevel, LogType } from 'vite';

export interface DevServerLogger extends Logger {
  serverRestarted: boolean;
}

const LogLevels: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
};

export interface RollupLogProps {
  code?: string;
  frame?: string;
  hook?: string;
  id?: string;
  loc?: {
    column: number;
    file?: string;
    line: number;
  };
  message: string;
  name?: string;
  plugin?: string;
  pluginCode?: string;
  pos?: number;
  url?: string;
}

interface RollupError extends RollupLogProps {
  parserError?: Error;
  stack?: string;
  watchFiles?: string[];
}

function clearScreen() {
  const repeatCount = process.stdout.rows - 2;
  const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : '';
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

let lastType: LogType | undefined;
let lastMsg: string | undefined;
let sameCount = 0;

export function createLogger(level: LogLevel = 'info'): DevServerLogger {
  const loggedErrors = new WeakSet<Error | RollupError>();
  const prefix = '[vite]';
  const allowClearScreen = true;
  const thresh = LogLevels[level];
  const clear =
    allowClearScreen && process.stdout.isTTY && !process.env.CI
      ? clearScreen
      : () => ({});

  function output(type: LogType, msg: string, options: LogErrorOptions = {}) {
    if (msg.includes('restarting server')) {
      logger.serverRestarted = true;
    }
    if (thresh >= LogLevels[type]) {
      const method = type === 'info' ? 'log' : type;
      const format = () => {
        if (options.timestamp) {
          const tag =
            type === 'info'
              ? pc.cyan(pc.bold(prefix))
              : type === 'warn'
              ? pc.yellow(pc.bold(prefix))
              : pc.red(pc.bold(prefix));
          return `${pc.dim(new Date().toLocaleTimeString())} ${tag} ${msg}`;
        } else {
          return msg;
        }
      };
      if (options.error) {
        loggedErrors.add(options.error);
      }
      if (type === lastType && msg === lastMsg) {
        sameCount++;
        clear();
        console[method](msg, pc.yellow(`(x${sameCount + 1})`));
      } else {
        sameCount = 0;
        lastMsg = msg;
        lastType = type;
        if (options.clear) {
          clear();
        }
        console[method](format());
      }
    }
  }

  const warnedMessages = new Set<string>();

  const logger: DevServerLogger = {
    hasWarned: false,
    serverRestarted: false,
    info(msg, opts) {
      output('info', msg, opts);
    },
    warn(msg, opts) {
      logger.hasWarned = true;
      output('warn', msg, opts);
    },
    warnOnce(msg, opts) {
      if (warnedMessages.has(msg)) return;
      logger.hasWarned = true;
      output('warn', msg, opts);
      warnedMessages.add(msg);
    },
    error(msg, opts) {
      logger.hasWarned = true;
      output('error', msg, opts);
    },
    clearScreen(type) {
      if (thresh >= LogLevels[type]) {
        clear();
      }
    },
    hasErrorLogged(error) {
      return loggedErrors.has(error);
    },
  };

  return logger;
}
