// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from 'electron';

import { blenderIPC } from '@/electron/ipcInterface/mainProcess/BlenderIPCInterface';

// Renderer Process to Main Process
contextBridge.exposeInMainWorld('BLENDER', blenderIPC);
