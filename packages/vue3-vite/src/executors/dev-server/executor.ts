import { DevServerExecutorSchema } from './schema';

export default async function runExecutor(options: DevServerExecutorSchema) {
  console.log('Executor ran for Build', options);
  return {
    success: true,
  };
}
