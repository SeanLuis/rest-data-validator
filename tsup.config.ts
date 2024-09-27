import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli/cli.ts'],
  format: ['esm'],
  sourcemap: false,
  clean: true,
  minify: true,
  dts: true,
  splitting: false,
  outDir: 'dist',
  target: 'es2020'
});
