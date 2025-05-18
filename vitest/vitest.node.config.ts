import { defineConfig, mergeConfig, ViteUserConfig } from 'vitest/config';

import { getVitestConfig } from './vitest.base.config';

export default defineConfig(() => {
  const config: ViteUserConfig = {
    test: {
      name: 'node',
      environment: 'node',
      include: ['test/base/node/**/*.test.ts'],
      coverage: {
        provider: 'v8',
        include: ['src/base/node/**'],
        reportsDirectory: 'coverage/node',
      },
    },
  };

  return mergeConfig(getVitestConfig(), config);
});
