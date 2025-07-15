import {
  BrowserWindow,
  ipcMain,
} from 'electron';

import { download } from 'electron-dl';

import {
  FETCH_VERSION,
  DOWNLOAD_VERSION,
} from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface';

import { DOWNLOAD_ON_PROGRESS } from '@/electron/ipcInterface/rendererProcess/BlenderCallbackIPCInterface';

import { BlenderStore } from '@/electron/store/blender-store';

import { isOver24HoursFromNow } from '@/base/common/utils/date-utils';

import { scrapStableReleases } from '@/base/node/blender-scrapyer';

export class BlenderIPCMain {
  constructor(mainWindow: BrowserWindow) {
    const blenderStore = new BlenderStore();

    ipcMain.handle(FETCH_VERSION, async (_event) => {
      const { lastUpdateDate, infos } = blenderStore.get();

      if (infos.length && lastUpdateDate && !isOver24HoursFromNow(lastUpdateDate)) {
        return infos;
      }

      const releases = await scrapStableReleases();
      blenderStore.set(releases);

      return releases;
    });

    ipcMain.handle(DOWNLOAD_VERSION, async (_event, url: string) => {
      download(
        mainWindow,
        url,
        {
          onStarted: () => {},
          onProgress: (progress) => {
            mainWindow.webContents.send(DOWNLOAD_ON_PROGRESS, url, progress.percent);
          },
        },
      );
    });
  }
}
