import { ipcRenderer } from 'electron';

export const FETCH_VERSION = 'FETCH_VERSION';
export const DOWNLOAD_VERSION = 'DOWNLOAD_VERSION';

export const blenderIPC: BlenderIPC = {
  fetchVersion: () => ipcRenderer.invoke(FETCH_VERSION),
  downloadVersion: (url: string) => ipcRenderer.invoke(DOWNLOAD_VERSION, url),
};
