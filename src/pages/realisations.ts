import '../app'

import Swiper from 'swiper'
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { getWorksSlides } from '../data/works-gallery'

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('works-swiper-mount')
  if (!mount) return

  const slides = getWorksSlides()

  if (!slides.length) {
    mount.innerHTML =
      '<p class="works-empty">Les photos de chantiers seront affichées ici après conversion en WebP (<code class="works-empty-code">pnpm images:works</code>).</p>'
    mount.classList.add('works-mount--empty')
    return
  }

  mount.className = 'works-swiper swiper'
  mount.setAttribute('role', 'region')
  mount.setAttribute('aria-roledescription', 'carrousel')
  mount.setAttribute('aria-label', 'Galerie de réalisations')

  const wrapper = document.createElement('div')
  wrapper.className = 'swiper-wrapper'
  slides.forEach((slide, i) => {
    const slideEl = document.createElement('div')
    slideEl.className = 'swiper-slide'

    const figure = document.createElement('figure')
    figure.className = 'works-slide-figure'

    const img = document.createElement('img')
    img.src = slide.src
    img.alt = slide.alt
    img.sizes = '(min-width: 1024px) min(52rem, 70vw), (min-width: 640px) 88vw, 100vw'
    img.loading = i === 0 ? 'eager' : 'lazy'
    img.decoding = 'async'
    img.className = 'works-slide-img'

    figure.appendChild(img)
    slideEl.appendChild(figure)
    wrapper.appendChild(slideEl)
  })

  const pagination = document.createElement('div')
  pagination.className = 'swiper-pagination works-swiper-pagination'

  const prev = document.createElement('button')
  prev.type = 'button'
  prev.className = 'swiper-button-prev works-swiper-btn'
  prev.setAttribute('aria-label', 'Image précédente')

  const next = document.createElement('button')
  next.type = 'button'
  next.className = 'swiper-button-next works-swiper-btn'
  next.setAttribute('aria-label', 'Image suivante')

  mount.append(wrapper, pagination, prev, next)

  void new Swiper(mount, {
    modules: [Navigation, Pagination, Keyboard, A11y],
    loop: slides.length > 2,
    centeredSlides: false,
    slidesPerView: 1,
    spaceBetween: 10,
    grabCursor: true,
    breakpoints: {
      640: {
        centeredSlides: true,
        slidesPerView: 1.04,
        spaceBetween: 12,
      },
      960: {
        slidesPerView: 1.08,
        spaceBetween: 18,
      },
    },
    keyboard: { enabled: true, onlyInViewport: true },
    pagination: {
      el: pagination,
      clickable: true,
      dynamicBullets: slides.length > 6,
      dynamicMainBullets: 5,
    },
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    a11y: {
      enabled: true,
      prevSlideMessage: 'Photo précédente',
      nextSlideMessage: 'Photo suivante',
      paginationBulletMessage: 'Aller à la photo {{index}}',
    },
  })
})
