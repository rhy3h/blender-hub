import { defineConfig, mergeConfig, ViteUserConfig } from 'vitest/config';

import { getVitestConfig } from './vitest.base.config';

export default defineConfig(() => {
  const config: ViteUserConfig = {
    test: {
      name: 'electron',
      environment: 'node',
      include: ['test/electron/**/*.test.ts'],
      coverage: {
        provider: 'v8',
        include: ['src/electron/**'],
        reportsDirectory: 'coverage/electron',
      },
    },
  };

  return mergeConfig(getVitestConfig(), config);
});
