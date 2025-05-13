/* eslint-disable no-new */

import {
  describe,
  expect,
  jest,
  it,
  beforeEach,
} from '@jest/globals';

import { ipcMain } from 'electron';

import { FETCH_VERSION } from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface';
import { BlenderIPCMain } from '@/electron/ipcMain/BlenderIPCMain';

jest.mock('electron', () => ({
  ipcMain: {
    handle: jest.fn(),
  },
}));

describe('BlenderIPCMain', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register FETCH_VERSION handler with correct response', async () => {
    // Arrange
    const handlerMock = jest.fn();
    (ipcMain.handle as jest.Mock).mockImplementation((_event, callback) => {
      handlerMock.mockImplementation(callback as unknown as () => void);
    });

    // Act
    new BlenderIPCMain();

    // Assert
    expect(ipcMain.handle).toHaveBeenCalledWith(
      FETCH_VERSION,
      expect.any(Function),
    );

    const response = await handlerMock();

    expect(response).toEqual([
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
