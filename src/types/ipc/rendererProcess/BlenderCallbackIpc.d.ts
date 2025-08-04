interface BlenderCallbackIpc {
  DOWNLOAD_ON_PROGRESS: (
    callback: (
      event: Electron.IpcRendererEvent,
      url: string,
      progress: number,
    ) => void,
  ) => void;
}
