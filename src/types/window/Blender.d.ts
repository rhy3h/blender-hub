type BlenderInstaller = {
  version: string
  status: "Installed" | "Not Installed"
  uploadTime: string
}

interface BlenderIPC {
  fetchVersion: () => Promise<BlenderInstaller[]>;
}