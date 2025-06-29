/* eslint-disable no-new */

import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from 'vitest';

import { FETCH_VERSION } from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface';
import { BlenderIPCMain } from '@/electron/ipcMain/BlenderIPCMain';

import {
  electronVitestMock,
  getHandle,
  resetIpcHandleMock,
} from 'electron-mock/vitest';

const mockWindow = electronVitestMock.BrowserWindow;
const mockApp = electronVitestMock.app;
const mockIpcMainInvokeEvent = electronVitestMock.IpcMainInvokeEvent;

describe('BlenderIPCMain', () => {
  beforeAll(() => {
    new BlenderIPCMain(mockWindow as unknown as Electron.BrowserWindow);
  });

  afterAll(() => {
    resetIpcHandleMock();
  });

  it('FETCH_VERSION', async () => {
    const handler = getHandle(FETCH_VERSION);

    const result = await handler(mockIpcMainInvokeEvent);

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
