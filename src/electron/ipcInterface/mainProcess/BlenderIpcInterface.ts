import { ipcRenderer } from 'electron';

export const FETCH_VERSION = 'FETCH_VERSION';
export const DOWNLOAD_VERSION = 'DOWNLOAD_VERSION';

export const blenderIpc: BlenderIpc = {
  FETCH_VERSION: () => ipcRenderer.invoke(FETCH_VERSION),
  DOWNLOAD_VERSION: (url: string) => ipcRenderer.invoke(DOWNLOAD_VERSION, url),
};
