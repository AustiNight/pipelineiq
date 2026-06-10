// === PP:FUNC:nav-init ===
(() => {
  const nav = document.querySelector('[data-pp-section="nav"]');
  if (!nav) {
    return;
  }
  const toggle = nav.querySelector('[data-nav-toggle]');
  const menu = nav.querySelector('[data-nav-menu]');
  if (!toggle || !menu) {
    return;
  }
  const openClass = 'nav--open';
  const hiddenClass = 'nav--hidden';
  const setExpanded = (expanded) => {
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    nav.classList.toggle(openClass, expanded);
  };
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!expanded);
  });
  menu.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      setExpanded(false);
    }
  });
  /* Scroll-direction hide/show */
  let lastScrollY = window.scrollY;
  const threshold = 60;
  const onScroll = () => {
    const currentY = window.scrollY;
    if (currentY < threshold) {
      nav.classList.remove(hiddenClass);
    } else if (currentY > lastScrollY) {
      nav.classList.add(hiddenClass);
    } else {
      nav.classList.remove(hiddenClass);
    }
    lastScrollY = currentY;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();
// === /PP:FUNC:nav-init ===
// === PP:FUNC:reveal-init ===

function initReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay || 0;
          setTimeout(function() {
            el.classList.add('visible');
          }, Number(delay));
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function(el) {
    observer.observe(el);
  });
}

// === /PP:FUNC:reveal-init ===


// === PP:FUNC:hero-init ===
(() => {
  const section = document.querySelector('[data-pp-section="hero"]');
  if (!section) {
    return;
  }
  const card = section.querySelector('.hero__card[data-reveal]');
  if (card) {
    card.style.setProperty('--reveal-delay', '0.15s');
  }
})();
// === /PP:FUNC:hero-init ===


// === PP:FUNC:about-init ===
(() => {
  const section = document.querySelector('[data-pp-section="about"]');
  if (!section) {
    return;
  }
  const content = section.querySelector('.about__content[data-reveal]');
  if (content) {
    content.style.setProperty('--reveal-delay', '0.1s');
  }
})();
// === /PP:FUNC:about-init ===


// === PP:FUNC:features-grid-init ===
(() => {
  const section = document.querySelector('[data-pp-section="features-grid"]');
  if (!section) {
    return;
  }
  const cards = section.querySelectorAll('.features-grid__card[data-reveal]');
  cards.forEach((card, i) => {
    card.style.setProperty('--reveal-delay', `${(i * 0.08).toFixed(2)}s`);
  });
})();
// === /PP:FUNC:features-grid-init ===


// === PP:FUNC:faq-init ===
(() => {
  const section = document.querySelector('[data-pp-section="faq"]');
  if (!section) {
    return;
  }
  const items = Array.from(section.querySelectorAll('[data-faq-item]'));
  if (items.length === 0) {
    return;
  }
  const setAnswerHeight = (item, open) => {
    const answer = item.querySelector('[data-faq-answer]');
    if (!answer) {
      return;
    }
    if (!open) {
      answer.style.maxHeight = '0px';
      return;
    }
    requestAnimationFrame(() => {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    });
  };
  items.forEach((item) => {
    setAnswerHeight(item, item.open);
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item && other.open) {
            other.open = false;
            setAnswerHeight(other, false);
          }
        });
      }
      setAnswerHeight(item, item.open);
    });
  });
})();
// === /PP:FUNC:faq-init ===


// === PP:FUNC:contact-init ===
(() => {
  const section = document.querySelector('[data-pp-section="contact"]');
  if (!section) {
    return;
  }
  const mapElement = section.querySelector('[data-map-container]');
  if (mapElement) {
    const lat = Number(mapElement.dataset.mapLat ?? '');
    const lng = Number(mapElement.dataset.mapLng ?? '');
    const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
    const coords = hasCoords ? [lat, lng] : [0, 0];
    const leaflet = window.L;
    if (leaflet) {
      const map = leaflet.map(mapElement).setView(coords, hasCoords ? 13 : 2);
      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '(c) OpenStreetMap contributors',
        })
        .addTo(map);
      leaflet.marker(coords).addTo(map);
    }
  }
  const form = section.querySelector('[data-contact-form]');
  const status = section.querySelector('[data-form-status]');
  if (form) {
    form.addEventListener('submit', () => {
      form.setAttribute('data-status', 'sending');
      if (status) {
        status.textContent = 'Sending...';
      }
    });
  }
})();
// === /PP:FUNC:contact-init ===


// === PP:FUNC:main ===
document.addEventListener('DOMContentLoaded', () => {
  // PP:MAIN_CALLS
});
// === /PP:FUNC:main ===

// PP:JS_INSERT_POINT