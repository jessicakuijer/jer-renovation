/**
 * Télécharge les médias depuis le site WordPress existant et produit des WebP
 * dans src/assets/images/ et public/ (logos + favicon + og — URLs SEO stables).
 */
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const SRC_IMG = path.join(ROOT, 'src/assets/images')
const PUBLIC = path.join(ROOT, 'public')
const BASE = 'https://jer-renovation.fr/wp-content/uploads/'

/** @type {{ wp: string, out: string, maxW: number|null }[]} */
const srcAssets = [
  { wp: 'jer-renovation-trauvaux-tous-corps-etat.jpg', out: 'hero-travaux.webp', maxW: 1400 },
  { wp: 'carte-zone.jpg', out: 'carte-zone.webp', maxW: 1200 },
  { wp: 'pose-de-parquet.jpg', out: 'pose-de-parquet.webp', maxW: 800 },
  { wp: 'pose-de-claustra-cloison.jpg', out: 'pose-de-claustra-cloison.webp', maxW: 800 },
  { wp: 'cloison.jpg', out: 'cloison.webp', maxW: 800 },
  { wp: 'cuisine-renovation-jer.jpg', out: 'cuisine-renovation-jer.webp', maxW: 800 },
  { wp: 'electricite.jpg', out: 'electricite.webp', maxW: 800 },
  { wp: 'enduit-renovation-travaux.jpg', out: 'enduit-renovation-travaux.webp', maxW: 800 },
  { wp: 'renovation-escalier.jpg', out: 'renovation-escalier.webp', maxW: 800 },
  { wp: 'luminaire.jpg', out: 'luminaire.webp', maxW: 800 },
  { wp: 'pose-de-parquet-bois.jpg', out: 'pose-de-parquet-bois.webp', maxW: 800 },
  { wp: 'peinture-maison-appartement.jpg', out: 'peinture-maison-appartement.webp', maxW: 800 },
  { wp: 'plomberie.jpg', out: 'plomberie.webp', maxW: 800 },
  { wp: 'salle-de-bain.jpg', out: 'salle-de-bain.webp', maxW: 800 },
  { wp: 'renovation-salon.jpg', out: 'renovation-salon.webp', maxW: 800 },
  { wp: 'renovation-sanitaire.jpg', out: 'renovation-sanitaire.webp', maxW: 800 },
]

/** @type {{ wp: string, out: string, maxW: number|null }[]} */
const publicAssets = [
  { wp: 'logo-jer-renovation.png', out: 'logo-horizontal.webp', maxW: 480 },
  { wp: 'logo-vertical-jer.png', out: 'logo-vertical.webp', maxW: 360 },
  { wp: 'favicon-jer-300x300.png', out: 'favicon.webp', maxW: 128 },
  { wp: 'favicon-jer.png', out: 'og.webp', maxW: 512 },
]

async function fetchBuf(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function toWebp(buffer, maxW, quality = 80) {
  const meta = await sharp(buffer).metadata()
  let img = sharp(buffer)
  if (maxW && meta.width && meta.width > maxW) {
    img = img.resize(maxW, undefined, { withoutEnlargement: true })
  }
  return img.webp({ quality }).toBuffer()
}

async function main() {
  await mkdir(SRC_IMG, { recursive: true })
  await mkdir(PUBLIC, { recursive: true })

  for (const { wp, out, maxW } of srcAssets) {
    const buf = await fetchBuf(BASE + wp)
    const webp = await toWebp(buf, maxW)
    await writeFile(path.join(SRC_IMG, out), webp)
    console.log('src/assets/images/', out)
  }

  for (const { wp, out, maxW } of publicAssets) {
    const buf = await fetchBuf(BASE + wp)
    const webp = await toWebp(buf, maxW)
    await writeFile(path.join(PUBLIC, out), webp)
    console.log('public/', out)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
