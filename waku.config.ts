import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'waku/config';

const ReactCompilerConfig = {};

const common = (): any => ({
  plugins: [
    tsconfigPaths({
      root: fileURLToPath(new URL('.', import.meta.url)),
    }),
  ],
});

const buildConfig = (): any => ({
  plugins: [
    ...common().plugins,
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
});

const devConfig = (): any => ({
  plugins: [
    ...buildConfig().plugins,
    checker({
      eslint: {
        lintCommand: 'eslint .',
        useFlatConfig: true,
      },
      typescript: true,
    }),
  ],
});

export default defineConfig({
  unstable_viteConfigs: {
    common,
    'dev-main': devConfig,
    'build-client': buildConfig,
  },
});
