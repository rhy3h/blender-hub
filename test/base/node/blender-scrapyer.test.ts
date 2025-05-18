/* eslint-disable no-new */

import {
  describe,
  expect,
  it,
} from 'vitest';

import { getFileInfo } from '@/base/node/blender-scrapyer';

describe('Blender Scraper', () => {
  it.todo('should scrap table releases', async () => {
  });

  it('should get blender info', async () => {
    const text = '                      18-Mar-2025 09:06           395018516';
    const fileInfo = getFileInfo(text);

    expect(fileInfo.time).toBe('18-Mar-2025 09:06');
    expect(fileInfo.size).toBe('395018516');
  });

  it.todo('should scrap download links', async () => {
  });
});
