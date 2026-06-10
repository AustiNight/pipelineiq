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

function faqInit() {
  var list = document.querySelector('[data-faq-list]');
  if (!list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll('[data-faq-item]'));
  if (!items.length) return;

  items.forEach(function (item) {
    var summary = item.querySelector('.faq__question');
    if (!summary) return;
    summary.setAttribute('role', 'button');
    summary.setAttribute('tabindex', '0');
    summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');

    item.addEventListener('toggle', function () {
      summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
      if (item.open) {
        items.forEach(function (other) {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });

    summary.addEventListener('keydown', function (event) {
      var key = event.key;
      var index = items.indexOf(item);
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault();
        var dir = key === 'ArrowDown' ? 1 : -1;
        var next = (index + dir + items.length) % items.length;
        var target = items[next].querySelector('.faq__question');
        if (target) target.focus();
      } else if (key === 'Home') {
        event.preventDefault();
        var first = items[0].querySelector('.faq__question');
        if (first) first.focus();
      } else if (key === 'End') {
        event.preventDefault();
        var lastEl = items[items.length - 1].querySelector('.faq__question');
        if (lastEl) lastEl.focus();
      }
    });
  });
}

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

// === PP:FUNC:perf-init ===
function perfInit() {
  // Lazy-load all images: native loading + IntersectionObserver fallback
  var imgs = Array.prototype.slice.call(document.querySelectorAll('img'));
  imgs.forEach(function (img) {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });

  if ('IntersectionObserver' in window) {
    var lazyImgs = imgs.filter(function (img) {
      return img.dataset && img.dataset.src;
    });
    if (lazyImgs.length) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            if (el.dataset.src) {
              el.src = el.dataset.src;
              el.removeAttribute('data-src');
            }
            obs.unobserve(el);
          }
        });
      }, { rootMargin: '200px 0px' });
      lazyImgs.forEach(function (img) { io.observe(img); });
    }
  }

  // Core Web Vitals tracking (LCP, FID/INP, CLS) via PerformanceObserver
  if ('PerformanceObserver' in window) {
    try {
      var lcpObserver = new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        var last = entries[entries.length - 1];
        if (last) {
          console.log('[Web Vitals] LCP:', Math.round(last.renderTime || last.loadTime || last.startTime), 'ms');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {}

    try {
      var fidObserver = new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (entry) {
          console.log('[Web Vitals] FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {}

    try {
      var clsValue = 0;
      var clsObserver = new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (entry) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('[Web Vitals] CLS:', clsValue.toFixed(4));
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', perfInit);
} else {
  perfInit();
}
// === /PP:FUNC:perf-init ===
// PP:JS_INSERT_POINT