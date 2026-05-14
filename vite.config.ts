import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const dir = path.dirname(fileURLToPath(import.meta.url))

function htmlInject(siteOrigin: string): Plugin {
  const ogImageUrl = `${siteOrigin}/og.webp`
  const schemaLogoUrl = `${siteOrigin}/logo-horizontal.webp`
  /** Évite le flash clair/sombre avant chargement des modules (navigation multipage). */
  const themeBoot = `<script>(function(){try{var k='jer-theme',t=localStorage.getItem(k);if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);else if(window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();</script>`
  return {
    name: 'jer-html-inject',
    transformIndexHtml(html) {
      let out = html
        .replaceAll('<%= siteOrigin %>', siteOrigin)
        .replaceAll('<%= ogImageUrl %>', ogImageUrl)
        .replaceAll('<%= schemaLogoUrl %>', schemaLogoUrl)
      out = out.replace(/<meta charset="utf-8" \/\s*>/i, `<meta charset="utf-8" />\n  ${themeBoot}`)
      return out
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteOrigin = env.VITE_SITE_ORIGIN ?? 'https://jer-renovation.fr'

  return {
    plugins: [htmlInject(siteOrigin)],
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(dir, 'index.html'),
          services: path.resolve(dir, 'services.html'),
          zones: path.resolve(dir, 'zones.html'),
          contact: path.resolve(dir, 'contact.html'),
          realisations: path.resolve(dir, 'realisations.html'),
          service: path.resolve(dir, 'service.html'),
          mentionsLegales: path.resolve(dir, 'mentions-legales.html'),
          viePrivee: path.resolve(dir, 'vie-privee.html'),
        },
      },
    },
  }
})
