// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';


const baseUrl = 'https://portfolio-8ym.pages.dev';

const anchors = [
    '', // homepage
    '#skills',
    '#project-1',
    '#project-2',
    '#project-3',
    '#contact',
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${anchors
    .map(anchor => `  <url>\n    <loc>${baseUrl}/${anchor}</loc>\n  </url>`)
    .join('\n')}\n</urlset>\n`;

fs.writeFileSync(path.resolve('public', 'sitemap.xml'), xml);
console.log('✅ Sitemap généré dans /public/sitemap.xml');
