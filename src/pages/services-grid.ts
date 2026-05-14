import { observeNewReveals } from '../app'
import { SERVICES, SERVICES_ORDER } from '../data/services'

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('services-grid-mount')
  if (!mount) return

  for (const slug of SERVICES_ORDER) {
    const d = SERVICES[slug]
    if (!d) continue

    const a = document.createElement('a')
    a.className = 'service-card reveal'
    a.id = slug
    a.href = `service.html?s=${encodeURIComponent(slug)}`

    const media = document.createElement('div')
    media.className = 'service-card-media'
    const img = document.createElement('img')
    img.src = d.image
    img.alt = d.title
    img.loading = 'lazy'
    media.appendChild(img)

    const body = document.createElement('div')
    body.className = 'service-card-body'
    const h3 = document.createElement('h3')
    h3.textContent = d.title
    const span = document.createElement('span')
    span.textContent = d.tagline
    body.appendChild(h3)
    body.appendChild(span)

    a.appendChild(media)
    a.appendChild(body)
    mount.appendChild(a)
  }

  observeNewReveals(mount)
})
