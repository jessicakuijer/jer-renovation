const modules = import.meta.glob<{ default: string }>('../assets/images/works/*.webp', {
  eager: true,
})

export interface WorkSlide {
  /** URL résolue par Vite */
  src: string
  alt: string
}

function basenameKey(pathStr: string): string {
  return (pathStr.split('/').pop() ?? '').replace(/\.webp$/i, '')
}

function humanCaption(slug: string): string {
  return slug.replace(/[-_]/g, ' ')
}

/** Images issues de `src/assets/images/works/` (webp), tri alphabétique du nom de fichier. */
export function getWorksSlides(): WorkSlide[] {
  return Object.entries(modules)
    .sort(([aPath], [bPath]) =>
      basenameKey(aPath).localeCompare(basenameKey(bPath), undefined, { numeric: true }),
    )
    .map(([assetPath]) => {
      const key = basenameKey(assetPath)
      return {
        src: modules[assetPath]!.default,
        alt:
          key.length > 0
            ? `Réalisation JER Rénovation — ${humanCaption(key)}`
            : 'Réalisation JER Rénovation',
      }
    })
}
