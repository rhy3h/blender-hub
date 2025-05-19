import { defineConfig, mergeConfig, ViteUserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

import { getVitestConfig } from './vitest.base.config';

export default defineConfig(() => {
  const config: ViteUserConfig = {
    plugins: [
      react(),
    ],
    test: {
      name: 'react',
      environment: 'jsdom',
      include: ['test/frontend/**/*.test.ts'],
      coverage: {
        provider: 'v8',
        include: ['src/frontend/**'],
        reportsDirectory: 'coverage/react',
      },
    },
  };

  return mergeConfig(getVitestConfig(), config);
});
