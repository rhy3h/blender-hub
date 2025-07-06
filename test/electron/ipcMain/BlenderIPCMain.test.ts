/* eslint-disable no-new */

import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from 'vitest';

import { blenderIPC } from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface';
import { BlenderIPCMain } from '@/electron/ipcMain/BlenderIPCMain';

import {
  electronVitestMock,
  resetIpcHandleMock,
} from 'electron-mock/vitest';

describe('BlenderIPCMain', () => {
  beforeAll(() => {
    const mockWindow = electronVitestMock.BrowserWindow as unknown as Electron.BrowserWindow;
    new BlenderIPCMain(mockWindow);
  });

  afterAll(() => {
    resetIpcHandleMock();
  });

  it('FETCH_VERSION', async () => {
    const result = await blenderIPC.fetchVersion();

    expect(result).toEqual([
      {
        version: '4.6',
        status: 'Installed',
        uploadTime: '2025-05-12 12:00:00',
      },
      {
        version: '4.3',
        status: 'Not Installed',
        uploadTime: '2025-05-12 12:00:00',
      },
      {
        version: '4.1',
        status: 'Not Installed',
        uploadTime: '2025-05-12 12:00:00',
      },
    ]);
  });
});
