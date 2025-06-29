import { ViteUserConfig } from 'vitest/config';

export function getVitestConfig(): ViteUserConfig {
  return {
    test: {
      clearMocks: true,
      restoreMocks: true,
      setupFiles: ['./test/vitest.setup.ts'],
      alias: {
        '@': '/src',
        test: '/test',
      },
    },
  };
}
