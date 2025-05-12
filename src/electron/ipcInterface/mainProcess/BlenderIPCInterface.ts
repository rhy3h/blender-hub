import { ipcRenderer } from 'electron'

export const FETCH_VERSION = 'FETCH_VERSION'

export const blenderIPC: BlenderIPC = {
  fetchVersion: () => ipcRenderer.invoke(FETCH_VERSION)
}