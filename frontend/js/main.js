// Project SPA helpers only. Template/vendor init runs in theme-main.js.
// Keep this file light and SPA-safe.

(function () {
  "use strict";

  // Mobile nav toggle and UX helpers (non-destructive)
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) mobileNavToogle();
    });
  });
})();

// Reinitialize vendor plugins after SPA route changes
window.runViewBootstraps = function (name) {
  try {
    // Re-run AOS animations
    if (window.AOS && typeof window.AOS.init === 'function') {
      window.AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    }

    // Re-bind GLightbox for any new elements
    if (window.GLightbox) {
      window.GLightbox({ selector: '.glightbox' });
    }

    // Re-init swiper sliders in the loaded view
    if (window.Swiper) {
      document.querySelectorAll('.init-swiper').forEach(function (swiperElement) {
        const cfgEl = swiperElement.querySelector('.swiper-config');
        if (!cfgEl) return;
        let config = {};
        try { config = JSON.parse(cfgEl.innerHTML.trim()); } catch { }
        new window.Swiper(swiperElement, config);
      });
    }

    // Re-init PureCounter if present
    if (window.PureCounter) {
      try { new window.PureCounter(); } catch { }
    }
  } catch (e) {
    console.warn('runViewBootstraps error for', name, e);
  }
};
