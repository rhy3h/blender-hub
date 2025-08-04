/* eslint-disable no-new */

import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from 'vitest';

import { blenderIpc } from '@/electron/ipcInterface/mainProcess/BlenderIpcInterface';
import { BlenderIpcMain } from '@/electron/ipcMain/BlenderIpcMain';

import {
  electronVitestMock,
  resetIpcHandleMock,
} from 'electron-mock/vitest';

describe('BlenderIpcMain', () => {
  beforeAll(() => {
    const mockWindow = electronVitestMock.BrowserWindow as unknown as Electron.BrowserWindow;
    new BlenderIpcMain(mockWindow);
  });

  afterAll(() => {
    resetIpcHandleMock();
  });

  it('FETCH_VERSION', async () => {
    const result = await blenderIpc.FETCH_VERSION();

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
