import { BuildAppExecutorSchema } from './schema';

export default async function runExecutor(options: BuildAppExecutorSchema) {
  console.log('Executor ran for Build', options);
  return {
    success: true,
  };
}
