type Architecture = 'x64' | 'arm' | '';
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

interface BlenderIPC {
  FETCH_VERSION: () => Promise<BlenderInfo[]>;
  DOWNLOAD_VERSION: (url: string) => Promise<void>;
}
