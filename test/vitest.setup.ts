import { beforeAll, vi } from 'vitest';

import { mockIpcMainHandle } from 'electron-mock/vitest';

beforeAll(() => {
  mockIpcMainHandle();

  vi.mock('electron-dl', () => ({
    ipcMain: {
      download: vi.fn(),
    },
  }));
});
