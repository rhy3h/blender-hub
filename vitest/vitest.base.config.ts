import { ViteUserConfig } from 'vitest/config';

export function getVitestConfig(): ViteUserConfig {
  return {
    test: {
      alias: {
        '@': '/src',
      },
    },
  };
}
