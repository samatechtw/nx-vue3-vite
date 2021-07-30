import { DevServerExecutorSchema } from './schema';
import executor from './executor';

const options: DevServerExecutorSchema = {};

describe('Build Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
