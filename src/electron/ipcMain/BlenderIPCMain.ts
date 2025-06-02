import {
  BrowserWindow,
  ipcMain,
} from 'electron';

import { download } from 'electron-dl';

import {
  FETCH_VERSION,
  DOWNLOAD_VERSION,
} from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface';

import { scrapStableReleases } from '@/base/node/blender-scrapyer';

export class BlenderIPCMain {
  constructor(mainWindow: BrowserWindow) {
    ipcMain.handle(FETCH_VERSION, async (_event) => {
      const releases = await scrapStableReleases();
      return releases;
    });

    ipcMain.handle(DOWNLOAD_VERSION, async (_event, url: string) => {
      download(
        mainWindow,
        url,
        {
          onProgress: (progress) => {
            console.log(progress);
          },
        },
      );
    });
  }
}
