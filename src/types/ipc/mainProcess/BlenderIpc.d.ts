type Architecture = 'x64' | 'arm64' | '';
type OS = 'win32' | 'darwin' | 'linux' | '';

interface BlenderInfo {
  version: string;
  name: string;
  ext: string;
  url: string;
  modifiedDate: string;
  size: string;

  os: OS;
  arch: Architecture;

  isZip: boolean;
}

interface BlenderIpc {
  FETCH_VERSION: () => Promise<BlenderInfo[]>;
  DOWNLOAD_VERSION: (url: string) => Promise<void>;
}
