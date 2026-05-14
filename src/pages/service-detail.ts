import '../app'
import { SERVICES, SERVICES_ORDER } from '../data/services'

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search)
  const slug = params.get('s') || 'cuisine'
  const data = SERVICES[slug]

  if (!data) {
    document.getElementById('s-title')!.textContent = 'Service introuvable'
    document.getElementById('s-intro')!.textContent =
      "Cette prestation n'existe pas. Revenez à la liste de tous les services."
    document.getElementById('bc-current')!.textContent = 'Introuvable'
    const heroImg = document.getElementById('s-image') as HTMLImageElement | null
    if (heroImg) heroImg.style.display = 'none'
    return
  }

  document.title = `${data.title} — JER Rénovation`
  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', data.intro)

  document.getElementById('bc-current')!.textContent = data.title
  document.getElementById('s-tagline')!.textContent = data.tagline
  document.getElementById('s-title')!.textContent = data.title
  document.getElementById('s-intro')!.textContent = data.intro

  const heroImg = document.getElementById('s-image') as HTMLImageElement
  heroImg.src = data.image
  heroImg.alt = `${data.title} — JER Rénovation`

  const bodyEl = document.getElementById('s-body')!
  bodyEl.textContent = ''

  const colA = document.createElement('div')
  colA.className = 'col-text'
  for (const p of data.body || []) {
    const el = document.createElement('p')
    el.textContent = p
    colA.appendChild(el)
  }
  bodyEl.appendChild(colA)

  const colB = document.createElement('div')
  colB.className = 'col-text'
  if (data.body2?.length) {
    for (const p of data.body2) {
      const el = document.createElement('p')
      el.textContent = p
      colB.appendChild(el)
    }
  } else {
    colB.innerHTML = `
          <div style="padding: 28px; border: 1px solid var(--rule); border-radius: var(--r-md); background: var(--bg-elev);">
            <h4 style="margin-bottom: 18px;">Pourquoi me confier ce chantier ?</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px;">
              <li style="display: flex; gap: 12px; align-items: flex-start;">
                <span style="color: var(--accent-600); font-weight: 600;">→</span>
                <span style="color: var(--text-soft);">Diagnostic et devis gratuits, sans engagement</span>
              </li>
              <li style="display: flex; gap: 12px; align-items: flex-start;">
                <span style="color: var(--accent-600); font-weight: 600;">→</span>
                <span style="color: var(--text-soft);">Un seul interlocuteur du début à la fin</span>
              </li>
              <li style="display: flex; gap: 12px; align-items: flex-start;">
                <span style="color: var(--accent-600); font-weight: 600;">→</span>
                <span style="color: var(--text-soft);">Garantie décennale sur tous les travaux</span>
              </li>
              <li style="display: flex; gap: 12px; align-items: flex-start;">
                <span style="color: var(--accent-600); font-weight: 600;">→</span>
                <span style="color: var(--text-soft);">Délais respectés, chantier propre</span>
              </li>
            </ul>
          </div>
        `
  }
  bodyEl.appendChild(colB)

  if (data.quote) {
    const q = document.createElement('blockquote')
    q.className = 'service-quote'
    const p = document.createElement('p')
    p.textContent = `« ${data.quote} »`
    q.appendChild(p)
    bodyEl.appendChild(q)
  }

  document.getElementById('s-closing-text')!.textContent =
    data.closing || 'Parlons de votre projet et obtenez un devis détaillé sous 48h.'

  const grid = document.getElementById('related-grid')!
  grid.textContent = ''
  const order = SERVICES_ORDER.filter((s) => s !== slug)
  let seed = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const picked = [...order].sort(() => rand() - 0.5).slice(0, 4)

  for (const s of picked) {
    const d = SERVICES[s]
    if (!d) continue
    const a = document.createElement('a')
    a.className = 'service-card'
    a.href = `service.html?s=${encodeURIComponent(s)}`

    const media = document.createElement('div')
    media.className = 'service-card-media'
    const rim = document.createElement('img')
    rim.src = d.image
    rim.alt = d.title
    rim.loading = 'lazy'
    media.appendChild(rim)

    const cb = document.createElement('div')
    cb.className = 'service-card-body'
    const h3 = document.createElement('h3')
    h3.textContent = d.title
    const span = document.createElement('span')
    span.textContent = d.tagline
    cb.appendChild(h3)
    cb.appendChild(span)

    a.appendChild(media)
    a.appendChild(cb)
    grid.appendChild(a)
  }
})
