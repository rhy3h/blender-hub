// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from 'electron';

import { blenderIpc } from '@/electron/ipcInterface/mainProcess/BlenderIpcInterface';
import { blenderCallbackIpc } from '@/electron/ipcInterface/rendererProcess/BlenderCallbackIpcInterface';

const rendererListeners: { apiKey: string; api: any }[] = [
// Renderer Process to Main Process
  { apiKey: 'BLENDER', api: blenderIpc },

  // Main Process to Renderer Process
  { apiKey: 'BLENDER_CALLBACK', api: blenderCallbackIpc },
];

for (let i = 0; i < rendererListeners.length; i += 1) {
  const { apiKey, api } = rendererListeners[i];

  contextBridge.exposeInMainWorld(apiKey, api);
}
