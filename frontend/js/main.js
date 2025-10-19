// Hybrid Router: in-page sections (Home) + SPA views (app pages)
const appRoot = document.getElementById("app");

// Sections that live INSIDE index.html (scroll targets)
const sectionIds = [
  "home",          // hero / top
  "about",         // about section on landing
  "home-services", // services preview on landing
  "contact"        // contact section on landing
];

// SPA views injected into #app
const viewRoutes = {
  dashboard: "dashboard",
  zones: "zones",
  spots: "spots",
  reservations: "reservations",
  vehicles: "vehicles",
  users: "users",
  login: "login",
  register: "register",
  services: "services",
  gallery: "portfolio"
};

const DEFAULT_VIEW = "dashboard";

// Smooth scrolling for in-page sections
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  // account for fixed header
  const header = document.getElementById("header");
  const headerH = header ? header.offsetHeight : 0;
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerH;
  window.scrollTo({ top, behavior: "smooth" });
  // Re-init animations when the section comes into view
  if (window.AOS && typeof AOS.init === "function") AOS.init();
}

// Inject an SPA view
async function loadView(name) {
  try {
    const res = await fetch(`./${name}.html`, { cache: "no-store" });
    if (!res.ok) throw new Error(`View not found: ${name}`);
    const html = await res.text();
    appRoot.innerHTML = html;
    runViewBootstraps(name);
    // scroll page so injected view header is visible
    const header = document.getElementById("header");
    const headerH = header ? header.offsetHeight : 0;
    const top = appRoot.getBoundingClientRect().top + window.pageYOffset - headerH;
    window.scrollTo({ top, behavior: "smooth" });
  } catch (err) {
    appRoot.innerHTML = `<div class="alert alert-danger m-3"><strong>Error:</strong> ${err.message}</div>`;
  }
}

// Re-init template/vendor scripts after each route
function runViewBootstraps(name) {
  if (window.AOS && typeof AOS.init === "function") AOS.init();

  if (window.GLightbox && typeof GLightbox === "function") {
    try { window._gl && window._gl.destroy(); } catch (e) { }
    window._gl = GLightbox({ selector: ".glightbox" });
  }

  if (window.Swiper) {
    document.querySelectorAll(".swiper").forEach(el => {
      if (!el.dataset.swiperBound) {
        // basic example config; adjust if your theme provides options
        new Swiper(el, { loop: true, slidesPerView: 1, spaceBetween: 24 });
        el.dataset.swiperBound = "1";
      }
    });
  }

  if (window.PureCounter) { new PureCounter(); }

  // Optional per-view hook like window.init_dashboard()
  const hook = window[`init_${name}`];
  if (typeof hook === "function") hook();
}

// Main router: decide if hash is a section or a view
function routeFromHash() {
  const hash = (location.hash || "").replace("#", "").trim();

  // 1) In-page section (Home / landing)
  if (sectionIds.includes(hash)) {
    // ensure #app is empty when we're on the landing page
    if (appRoot && appRoot.innerHTML.trim() === "") {
      // nothing to do, just scroll
    }
    scrollToSection(hash);
    return;
  }

  // 2) SPA view
  const view = viewRoutes[hash] ? hash : DEFAULT_VIEW;
  loadView(viewRoutes[view]);
}

window.addEventListener("hashchange", routeFromHash);
window.addEventListener("load", routeFromHash);

