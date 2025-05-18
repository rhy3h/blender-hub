import path from 'node:path';

import * as cheerio from 'cheerio';

import semver from 'semver';

export function getBlenderInfo(info: string, href: string) {
  const text = info.trim();

  const regex = /^([\d]{2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2})\s+(\d+)$/;
  const infoMatch = text.match(regex);

  if (!infoMatch) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_, time, size] = infoMatch;

  const blenderInfo: BlenderInfo = {
    url: href,
    modifiedDate: time,
    size,

    os: '',
    arch: '',
    isZip: false,
  };

  return blenderInfo;
}

export async function scrapDownloadLinks(link: string) {
  const url = `https://download.blender.org/release/${link}`;
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const B3D_LINK = /blender-(\d+\.\d+\.\d+)/;

  const blenderReleaseMap = new Map<string, BlenderRelease>();

  $('a').each((_, element) => {
    const href = $(element).attr('href');
    const text = $(element).text().replace('/', '');

    const match = text.match(B3D_LINK);

    if (!match) {
      return;
    }

    const [fullname, version] = match;

    if (!blenderReleaseMap.get(version)) {
      blenderReleaseMap.set(version, {
        version,
      });
    }
    const blenderRelease = blenderReleaseMap.get(version);

    const architecture = text.replace(fullname, '');
    const { ext } = path.parse(text);

    const nextSibling = element.nextSibling as unknown as Node | null;
    const blenderInfo = getBlenderInfo(nextSibling?.nodeValue?.trim(), href);

    if (!blenderInfo) {
      return;
    }

    if (ext === '.md5') {
      blenderRelease.md5 = blenderInfo;
    } else if (ext === '.sha256') {
      blenderRelease.sha256 = blenderInfo;
    } else {
      const IS_WINDOWS = architecture.includes('windows');
      const IS_MACOS = architecture.includes('macos');
      const IS_LINUX = architecture.includes('linux');

      if (IS_WINDOWS) {
        const IS_X64 = architecture.includes('x64');
        const IS_ARM = architecture.includes('arm64');

        if (IS_X64) {
          switch (ext) {
            case '.msi':
              blenderRelease.windowsX64Msi = blenderInfo;
              break;
            case '.msix':
              blenderRelease.windowsX64Msix = blenderInfo;
              break;
            case '.exe':
              blenderRelease.windowsX64Exe = blenderInfo;
              break;
            case '.zip':
              blenderRelease.windowsX64Zip = blenderInfo;
              break;
            default:
              break;
          }
        } else if (IS_ARM) {
          switch (ext) {
            case '.msi':
              blenderRelease.windowsArmMsi = blenderInfo;
              break;
            case '.msix':
              blenderRelease.windowsArmMsix = blenderInfo;
              break;
            case '.exe':
              blenderRelease.windowsArmExe = blenderInfo;
              break;
            case '.zip':
              blenderRelease.windowsArmZip = blenderInfo;
              break;
            default:
              break;
          }
        }
      } else if (IS_MACOS) {
        const IS_X64 = architecture.includes('x64');
        const IS_ARM = architecture.includes('arm64');

        if (IS_X64) {
          blenderRelease.macOsX64 = blenderInfo;
        } else if (IS_ARM) {
          blenderRelease.macOsArm = blenderInfo;
        }
      } else if (IS_LINUX) {
        blenderRelease.linux = blenderInfo;
      }
    }
  });

  return [...blenderReleaseMap.values()];
}

export async function scrapStableReleases() {
  const url = 'https://download.blender.org/release';
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const minimumVersion = new semver.SemVer('3.0.0');
  const B3D_LINK = /Blender(\d+\.\d+)/;

  const links: string[] = [];

  $('a').each((_, element) => {
    const href = $(element).attr('href');
    const text = $(element).text().replace('/', '');

    const match = text.match(B3D_LINK);

    if (match) {
      const [fullname, version] = match;
      const beta = text.replace(fullname, '').replace('-', '');
      const [major, patch] = version.split('.').map((m) => parseInt(m, 10));

      let versionStr = `${major}.${patch}.0`;
      if (beta) {
        versionStr += `-${beta}`;
      }
      const vaildVersion = new semver.SemVer(versionStr);

      if (vaildVersion > minimumVersion) {
        links.push(href);
      }
    }
  });

  const blenderReleases: BlenderRelease[] = [];
  for (let i = 0; i < links.length; i += 1) {
    const link = links[i];
    const downloadLinks = await scrapDownloadLinks(link);
    blenderReleases.push(...downloadLinks);
  }

  return blenderReleases;
}
