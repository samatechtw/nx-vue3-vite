import { ExecutorContext } from '@nrwl/devkit';
import { DevServerExecutorSchema } from './schema';

export default async function runExecutor(
  options: DevServerExecutorSchema,
  ExecutorContext,
) {
  console.log('Executor ran for Build', options);
  return {
    success: true,
  };
}
