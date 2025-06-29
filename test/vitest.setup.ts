import { vi } from 'vitest';

import { setupIpcMainHandleMock } from 'electron-mock/vitest';

setupIpcMainHandleMock();

vi.mock('electron-dl', () => ({
  ipcMain: {
    download: vi.fn(),
  },
}));
