import type { APIRoute } from 'astro';
import { locales, defaultLocale, localeMeta } from '../i18n';

const SITE_URL = 'https://aiberm.com/docs';

// 以 en 目录的页面清单为准，新增文档页时 sitemap 自动跟上
const pageIds = Object.keys(import.meta.glob('./en/*.mdx'))
  .map((p) => p.replace('./en/', '').replace('.mdx', ''))
  .sort();

export const GET: APIRoute = () => {
  const urls = pageIds
    .map((id) =>
      locales
        .map((lang) => {
          const alternates = locales
            .map(
              (alt) =>
                `    <xhtml:link rel="alternate" hreflang="${localeMeta[alt].htmlLang}" href="${SITE_URL}/${alt}/${id}/"/>`,
            )
            .join('\n');
          return [
            '  <url>',
            `    <loc>${SITE_URL}/${lang}/${id}/</loc>`,
            alternates,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/${defaultLocale}/${id}/"/>`,
            '  </url>',
          ].join('\n');
        })
        .join('\n'),
    )
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
