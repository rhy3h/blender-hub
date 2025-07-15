import { createIpcRenderer } from '@/electron/CreateIpcRenderer';

const BLENDER_PREFIX = 'BLENDER_';

export const DOWNLOAD_ON_PROGRESS = `${BLENDER_PREFIX}DOWNLOAD_ON_PROGRESS`;

export const blenderCallbackIPC: BlenderCallbackIPC = {
  DOWNLOAD_ON_PROGRESS: (callback) => {
    createIpcRenderer(DOWNLOAD_ON_PROGRESS, callback);
  },
};
