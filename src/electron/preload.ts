// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from 'electron';

import { blenderIPC } from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface';
import { blenderCallbackIPC } from '@/electron/ipcInterface/rendererProcess/BlenderCallbackIPCInterface';

const rendererListeners: { apiKey: string; api: any }[] = [
// Renderer Process to Main Process
  { apiKey: 'BLENDER', api: blenderIPC },

  // Main Process to Renderer Process
  { apiKey: 'BLENDER_CALLBACK', api: blenderCallbackIPC },
];

for (let i = 0; i < rendererListeners.length; i += 1) {
  const { apiKey, api } = rendererListeners[i];

  contextBridge.exposeInMainWorld(apiKey, api);
}
