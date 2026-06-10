/* JER Rénovation — shared interactions */

const STORAGE_KEY = 'jer-theme'
const MEDIA_NAV_DESKTOP = '(min-width: 992px)'

const root = document.documentElement
const stored = localStorage.getItem(STORAGE_KEY)
if (stored === 'dark' || stored === 'light') {
  root.setAttribute('data-theme', stored)
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.setAttribute('data-theme', 'dark')
}

const copyrightYear = String(new Date().getFullYear())
document.querySelectorAll<HTMLTimeElement>('.jer-copyright-year').forEach((el) => {
  el.dateTime = copyrightYear
  el.textContent = copyrightYear
})

function attachRevealObserver(elements: NodeListOf<Element> | Element[]): void {
  const list = elements instanceof NodeList ? Array.from(elements) : elements
  if (!list.length) return

  if (!('IntersectionObserver' in window)) {
    list.forEach((el) => el.classList.add('in'))
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  )
  list.forEach((el) => io.observe(el))
}

/** À appeler après injection DOM de nœuds `.reveal` (ex. grille services). */
export function observeNewReveals(scope: ParentNode): void {
  attachRevealObserver(scope.querySelectorAll('.reveal:not(.in)') as NodeListOf<Element>)
}

const ECOINDEX_BADGE_SRC =
  'https://cdn.jsdelivr.net/gh/cnumr/ecoindex_badge@3/assets/js/ecoindex-badge.js'

function initEcoindexBadge(): void {
  const mount = document.getElementById('ecoindex-badge')
  if (!mount || document.querySelector(`script[src="${ECOINDEX_BADGE_SRC}"]`)) return

  const script = document.createElement('script')
  script.src = ECOINDEX_BADGE_SRC
  script.defer = true
  document.body.appendChild(script)
}

function setMobileNav(open: boolean, menuToggle: HTMLButtonElement, nav: HTMLElement): void {
  nav.classList.toggle('open', open)
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false')
  menuToggle.setAttribute(
    'aria-label',
    open ? 'Fermer le menu' : 'Ouvrir le menu de navigation',
  )
  document.body.classList.toggle('nav-open', open)
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.theme-toggle')
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
      const next = current === 'dark' ? 'light' : 'dark'
      root.setAttribute('data-theme', next)
      localStorage.setItem(STORAGE_KEY, next)
    })
  }

  const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
  const nav = document.getElementById('primary-nav')
  const mqDesk = window.matchMedia(MEDIA_NAV_DESKTOP)

  const closeMobileNav = () => {
    if (!menuToggle || !nav) return
    // Resynchroniser body + nav : un `nav-open` orphelin masquait les FAB (voir main.css).
    setMobileNav(false, menuToggle, nav)
  }

  if (menuToggle && nav) {
    menuToggle.setAttribute(
      'aria-label',
      nav.classList.contains('open') ? 'Fermer le menu' : 'Ouvrir le menu de navigation',
    )

    menuToggle.addEventListener('click', () => {
      const willOpen = !nav.classList.contains('open')
      setMobileNav(willOpen, menuToggle, nav)
    })

    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => closeMobileNav())
    })

    if (!nav.classList.contains('open')) {
      document.body.classList.remove('nav-open')
    }
  }

  const onDeskChange = () => {
    if (!menuToggle || !nav) return
    if (mqDesk.matches) setMobileNav(false, menuToggle, nav)
  }
  mqDesk.addEventListener('change', onDeskChange)
  onDeskChange()

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    closeMobileNav()
  })

  document.body.addEventListener('click', (e) => {
    if (!document.body.classList.contains('nav-open') || !nav || !menuToggle) return
    const target = e.target
    if (!(target instanceof Element)) return
    if (target.closest('#primary-nav') || target.closest('.menu-toggle')) return
    if (target.closest('.site-header')) return
    closeMobileNav()
  })

  attachRevealObserver(document.querySelectorAll('.reveal'))
  initEcoindexBadge()

  const header = document.querySelector('.site-header') as HTMLElement | null
  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY
        header.style.boxShadow = y > 8 ? '0 1px 0 rgba(11,31,58,0.06)' : 'none'
      },
      { passive: true },
    )
  }
})
