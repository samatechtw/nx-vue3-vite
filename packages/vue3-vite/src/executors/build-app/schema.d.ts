export interface BuildAppExecutorSchema {
  dist?: string;
  mode: string;
  minify: 'terser' | 'esbuild' | 'none';
}
