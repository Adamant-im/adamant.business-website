import assert from 'node:assert/strict';
import test from 'node:test';

import { parseMediumFeed } from '../lib/content-sources.mjs';

test('parses feed posts and excludes Medium responses', () => {
  const xml = `<?xml version="1.0"?><rss xmlns:dc="urn:dc" xmlns:content="urn:content" xmlns:atom="urn:atom"><channel>
    <item><title><![CDATA[Engineering update]]></title><link>https://news.adamant.im/engineering-update-abcdef123456?source=rss</link><guid>https://medium.com/p/abcdef123456</guid><dc:creator>Alice</dc:creator><pubDate>Tue, 14 Jul 2026 10:00:00 GMT</pubDate><atom:updated>2026-07-14T10:00:00.000Z</atom:updated><category>engineering</category><content:encoded><![CDATA[<p>Useful details.</p><img src="https://cdn-images-1.medium.com/example.png" />]]></content:encoded></item>
    <item><title><![CDATA[Response to Engineering update]]></title><link>https://medium.com/p/111111111111</link><guid>https://medium.com/p/111111111111</guid><dc:creator>Bob</dc:creator><pubDate>Tue, 14 Jul 2026 11:00:00 GMT</pubDate><category>Responses</category><content:encoded><![CDATA[<p>Comment.</p>]]></content:encoded></item>
  </channel></rss>`;
  const records = parseMediumFeed(xml);
  assert.equal(records.length, 1);
  assert.equal(records[0].originalId, 'medium:abcdef123456');
  assert.equal(records[0].sourceUrl, 'https://news.adamant.im/engineering-update-abcdef123456');
  assert.match(records[0].body, /cdn-images-1\.medium\.com/);
});
