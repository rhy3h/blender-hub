import {
  ipcMain,
} from 'electron'

import {
  FETCH_VERSION
} from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface'

export class BlenderIPCMain {
  constructor () {
    ipcMain.handle(FETCH_VERSION, async (_event) => {
      return  [
        {
          version: "4.6",
          status: "Installed",
          uploadTime: "2025-05-12 12:00:00",
        },
        {
          version: "4.3",
          status: "Not Installed",
          uploadTime: "2025-05-12 12:00:00",
        },
        {
          version: "4.1",
          status: "Not Installed",
          uploadTime: "2025-05-12 12:00:00",
        },
      ]
    })
  }
}