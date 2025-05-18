import {
  describe,
  expect,
  it,
} from 'vitest';

import { getBlenderInfo } from '@/base/node/blender-scrapyer';

describe('Blender Scraper', () => {
  it.todo('should scrap table releases', async () => {
  });

  it('should get blender info', async () => {
    const url = 'https://download.blender.org/release/Blender4.4/blender-4.4.0-windows-x64.msix';
    const text = '                      18-Mar-2025 09:06           395018516';
    const blenderInfo = getBlenderInfo(text, url);

    expect(blenderInfo.url).toBe(url);
    expect(blenderInfo.modifiedDate).toBe('18-Mar-2025 09:06');
    expect(blenderInfo.size).toBe('395018516');
  });

  it.todo('should scrap download links', async () => {
  });
});
