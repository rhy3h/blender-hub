/* eslint-disable no-new */

import { app } from 'electron';

import electronDl from 'electron-dl';

import MainWindow from '@/electron/window/MainWindow';

import { BlenderIpcMain } from '@/electron/ipcMain/BlenderIpcMain';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

electronDl();

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new MainWindow();

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.
  new BlenderIpcMain(mainWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', (_event, hasVisibleWindows) => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!hasVisibleWindows) {
    createWindow();
  }
});
