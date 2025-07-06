import {
  BrowserWindow,
  ipcMain,
} from 'electron';

import { download } from 'electron-dl';

import {
  FETCH_VERSION,
  DOWNLOAD_VERSION,
} from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface';

import { BlenderStore } from '@/electron/store/blender-store';

import { scrapStableReleases } from '@/base/node/blender-scrapyer';

export class BlenderIPCMain {
  constructor(mainWindow: BrowserWindow) {
    const blenderStore = new BlenderStore();

    function isOver24HoursFromNow(isoString: string) {
      const targetDate = new Date(isoString);
      const now = new Date();
      const diffMs = Math.abs(now.getTime() - targetDate.getTime());
      return diffMs > 24 * 60 * 60 * 1000;
    }

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
          onProgress: (progress) => {
            console.log(progress);
          },
        },
      );
    });
  }
}
