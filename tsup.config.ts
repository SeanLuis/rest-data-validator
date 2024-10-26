import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli/cli.ts'],
  format: ['esm', 'cjs'],
  sourcemap: false,
  clean: true,
  minify: true,
  dts: true,
  splitting: false,
  outDir: 'dist',
  target: 'es2020',
  outExtension: ({ format }) => ({ js: format === 'esm' ? '.mjs' : '.js' }),
});
