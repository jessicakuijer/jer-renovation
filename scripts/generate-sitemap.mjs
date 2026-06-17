/**
 * Génère public/sitemap.xml et public/robots.txt (copiés dans dist/ au build Vite).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const SERVICES_TS = path.join(ROOT, 'src/data/services.ts')

const siteOrigin = (process.env.VITE_SITE_ORIGIN ?? 'https://jer-renovation.fr').replace(/\/$/, '')

function readServiceSlugs() {
  const src = readFileSync(SERVICES_TS, 'utf8')
  const block = src.match(/export const SERVICES_ORDER = \[([\s\S]*?)\] as const/)
  if (!block) throw new Error('SERVICES_ORDER introuvable dans src/data/services.ts')
  return [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
}

function xmlEscape(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function urlEntry(loc, { changefreq = 'monthly', priority = '0.5' } = {}) {
  const lastmod = new Date().toISOString().slice(0, 10)
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const staticPages = [
  { loc: `${siteOrigin}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${siteOrigin}/services/`, changefreq: 'monthly', priority: '0.9' },
  { loc: `${siteOrigin}/realisations/`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${siteOrigin}/zones-intervention/`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${siteOrigin}/contact/`, changefreq: 'yearly', priority: '0.7' },
]

const servicePages = readServiceSlugs().map((slug) => ({
  loc: `${siteOrigin}/service.html?s=${encodeURIComponent(slug)}`,
  changefreq: 'monthly',
  priority: '0.7',
}))

const urls = [...staticPages, ...servicePages]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((entry) => urlEntry(entry.loc, entry)).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteOrigin}/sitemap.xml
`

mkdirSync(PUBLIC, { recursive: true })
writeFileSync(path.join(PUBLIC, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(path.join(PUBLIC, 'robots.txt'), robots, 'utf8')

console.log(`Sitemap : ${urls.length} URL → public/sitemap.xml`)
console.log(`Robots  : public/robots.txt`)
