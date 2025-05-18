import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: './vitest/vitest.electron.config.ts',
  },
  {
    extends: './vitest/vitest.react.config.ts',
  },
  {
    extends: './vitest/vitest.node.config.ts',
  },
]);
