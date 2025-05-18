type Architecture = 'x64' | 'x86' | 'arm' | '';
type OS = 'Windows' | 'macOS' | 'Linux' | '';

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
  fetchVersion: () => Promise<BlenderInfo[]>;
}
