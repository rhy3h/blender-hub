interface BlenderInfo {
  url: string;
  modifiedDate: string;
  size: string;
}

interface BlenderRelease {
  version: string;

  windowsX64Msi?: BlenderInfo;
  windowsX64Msix?: BlenderInfo;
  windowsX64Exe?: BlenderInfo;
  windowsX64Zip?: BlenderInfo;

  windowsArmMsi?: BlenderInfo;
  windowsArmMsix?: BlenderInfo;
  windowsArmExe?: BlenderInfo;
  windowsArmZip?: BlenderInfo;

  macOsX64?: BlenderInfo;
  macOsArm?: BlenderInfo;

  linux?: BlenderInfo;

  md5?: BlenderInfo;
  sha256?: BlenderInfo;
}

interface BlenderIPC {
  fetchVersion: () => Promise<BlenderRelease[]>;
}
