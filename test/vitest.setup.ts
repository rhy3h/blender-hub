import { vi } from 'vitest';

import { mockIpcMainHandle } from 'electron-mock/vitest';

mockIpcMainHandle();

vi.mock('electron-dl', () => ({
  ipcMain: {
    download: vi.fn(),
  },
}));
