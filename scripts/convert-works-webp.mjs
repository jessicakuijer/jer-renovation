/**
 * Convertit les images locales (JPEG, PNG, TIFF) de src/assets/images/works en WebP,
 * puis supprime chaque fichier source une fois la sortie créée avec succès.
 * Réutilise Sharp comme scripts/build-images.mjs.
 *
 * Variables d’environnement (optionnelles) :
 *   WORKS_MAX_WIDTH — largeur max en px (défaut 1600, sans élargissement)
 *   WORKS_QUALITY   — qualité WebP 1–100 (défaut 80)
 *
 * Usage : pnpm images:works
 */
import sharp from 'sharp'
import { mkdir, readdir, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const WORKS_DIR = path.join(ROOT, 'src/assets/images/works')

const INPUT_EXT = /\.(jpe?g|png|tiff?)$/i

const maxWidth =
  Number.parseInt(process.env.WORKS_MAX_WIDTH ?? '', 10) ||
  Number.parseInt(process.env.WORKS_MAX_W ?? '', 10) ||
  1600
const quality =
  Number.parseInt(process.env.WORKS_QUALITY ?? '', 10) || 80

/** @returns {Promise<string[]>} */
async function collectImageFiles(dir) {
  /** @type {string[]} */
  const out = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      out.push(...(await collectImageFiles(full)))
    } else if (ent.isFile() && INPUT_EXT.test(ent.name)) {
      out.push(full)
    }
  }
  return out
}

/**
 * @param {string} inputPath
 * @param {string} outputPath
 */
async function convertToWebp(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata()
  let img = sharp(inputPath)
  if (maxWidth > 0 && meta.width && meta.width > maxWidth) {
    img = img.resize(maxWidth, undefined, { withoutEnlargement: true })
  }
  await img.webp({ quality }).toFile(outputPath)
}

async function main() {
  await mkdir(WORKS_DIR, { recursive: true })

  const files = await collectImageFiles(WORKS_DIR)
  if (!files.length) {
    console.log(`Prêt : ${path.relative(ROOT, WORKS_DIR)}/`)
    console.log(
      'Ajoutez des fichiers .jpg, .png ou .tiff dans ce dossier, puis relancez : pnpm images:works',
    )
    process.exit(0)
  }

  console.log(`maxWidth=${maxWidth} quality=${quality}`)
  for (const abs of files) {
    const outPath = `${abs.replace(INPUT_EXT, '')}.webp`
    await convertToWebp(abs, outPath)
    await unlink(abs)
    console.log(
      `${path.relative(ROOT, abs)} → ${path.relative(ROOT, outPath)} (source supprimée)`,
    )
  }
  console.log(`Terminé : ${files.length} fichier(s).`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
