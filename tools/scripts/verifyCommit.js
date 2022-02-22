const pc = require('picocolors');
const msgPath = process.env.MSG_PATH;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const releaseRE = /^v\d/;
const commitRE =
  /^(revert: )?(feat|fix|docs|refactor|perf|test|workflow|build|ci|chore|wip|release)(\(.+\))?: .{1,50}(#\d+)?/;

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
  console.error(
    `  ${pc.bgRed.white(' ERROR ')} ${pc.red(
      `invalid commit message format.`
    )}\n\n` +
      pc.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${pc.green(`feat: add 'comments' option`)}\n` +
      `    ${pc.green(`fix: handle events on blur (close #28)`)}\n\n` +
      pc.red(`  See .github/commit-convention.md for more details.\n`)
  );
  process.exit(1);
}
