import {
  ipcMain,
} from 'electron';

import {
  FETCH_VERSION,
} from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface';

import { scrapStableReleases } from '@/base/node/blender-scrapyer';

export class BlenderIPCMain {
  constructor() {
    ipcMain.handle(FETCH_VERSION, async (_event) => {
      const releases = await scrapStableReleases();
      return releases;
    });
  }
}
