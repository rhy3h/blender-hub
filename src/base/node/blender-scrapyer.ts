import path from 'node:path';
import os from 'os';

import * as cheerio from 'cheerio';

import semver from 'semver';

export function getFileInfo(info: string) {
  const text = info.trim();

  const regex = /^([\d]{2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2})\s+(\d+)$/;
  const infoMatch = text.match(regex);

  if (!infoMatch) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_, time, size] = infoMatch;

  return {
    time,
    size,
  };
}

export async function scrapDownloadLinks(link: string) {
  const url = `https://download.blender.org/release/${link}`;
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const B3D_LINK = /blender-(\d+\.\d+\.\d+)/;

  const blenderInfos: BlenderInfo[] = [];

  $('a').each((_, element) => {
    const href = $(element).attr('href');
    const text = $(element).text().replace('/', '');

    const match = text.match(B3D_LINK);

    if (!match) {
      return;
    }

    const [fullname, version] = match;

    const architecture = text.replace(fullname, '');
    const { ext } = path.parse(text);

    const nextSibling = element.nextSibling as unknown as Node | null;
    const fileInfo = getFileInfo(nextSibling?.nodeValue?.trim());

    if (!fileInfo) {
      return;
    }

    const blenderInfo: BlenderInfo = {
      version,
      name: fullname,
      ext,
      url: `${url}/${href}`,
      modifiedDate: fileInfo.time,
      size: fileInfo.size,

      os: '',
      arch: '',
      isZip: false,
    };

    const IS_WINDOWS = architecture.includes('windows');
    const IS_MACOS = architecture.includes('macos');
    const IS_LINUX = architecture.includes('linux');

    if (IS_WINDOWS) {
      blenderInfo.os = 'win32';
      blenderInfo.arch = architecture.includes('arm64') ? 'arm64' : 'x64';
    } else if (IS_MACOS) {
      blenderInfo.os = 'darwin';
      blenderInfo.arch = architecture.includes('arm64') ? 'arm64' : 'x64';
    } else if (IS_LINUX) {
      blenderInfo.os = 'linux';
      blenderInfo.arch = 'x64';
    }

    if (ext === '.zip') {
      blenderInfo.isZip = true;
    }

    blenderInfos.push(blenderInfo);
  });

  return blenderInfos;
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

  const blenderInfos: BlenderInfo[] = [];
  for (let i = 0; i < links.length; i += 1) {
    const link = links[i];
    const downloadLinks = await scrapDownloadLinks(link);
    blenderInfos.push(...downloadLinks);
  }

  const platform = os.platform();
  const arch = os.arch();

  const supportBlenderInfos = blenderInfos.filter(
    (f) => {
      const isMatchPlatform = f.os === platform;
      const isMatchArch = f.arch === arch;
      const isNotZip = !f.isZip;
      const isWinMsi = platform !== 'win32' || f.ext === '.msi';

      return isMatchPlatform && isMatchArch && isNotZip && isWinMsi;
    },
  );

  return supportBlenderInfos;
}
