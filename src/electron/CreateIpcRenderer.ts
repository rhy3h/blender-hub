import { ipcRenderer } from 'electron';

type RendererListener = (
  event: Electron.IpcRendererEvent,
  ...args: any[]
) => void;

const listeners: { [key: string]: RendererListener } = {};

export function createIpcRenderer(channel: string, listener: RendererListener) {
  if (listeners[channel]) {
    console.log(`Remove listener "${channel}"`);
    ipcRenderer.removeListener(channel, listeners[channel]);
    listeners[channel] = null;
  }

  console.log(`Listen to "${channel}"`);
  ipcRenderer.on(channel, listener);
  listeners[channel] = listener;
}
