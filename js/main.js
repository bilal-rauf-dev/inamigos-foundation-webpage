/* ================================================================
   InAmigos Foundation — main.js
   Handles: navbar, hamburger, scroll-reveal, count-up,
            gallery lightbox, form validation + fetch submit
   ================================================================ */

/* ===== NAVBAR: sticky shadow + hamburger ===== */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const navClose  = document.getElementById('nav-close');

  if (!navbar) return;

  /* Sticky shadow on scroll */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* Hamburger open */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.add('open');
      if (navOverlay) navOverlay.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
  }

  /* Close helpers */
  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navClose) navClose.addEventListener('click', closeMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);

  /* Close on ESC */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  /* Close on nav link click (mobile) */
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
  }

  /* Active nav link — match by filename */
  const page = location.pathname.split('/').pop() || 'index.html';
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }
})();

/* ===== SCROLL REVEAL ===== */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

/* ===== COUNT-UP ANIMATION ===== */
(function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease-out */
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
})();

/* ===== GALLERY LIGHTBOX ===== */
(function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg      = lightbox.querySelector('.lightbox-img');
  const lbCaption  = lightbox.querySelector('.lightbox-caption');
  const lbClose    = lightbox.querySelector('.lightbox-close');
  const lbPrev     = lightbox.querySelector('.lightbox-prev');
  const lbNext     = lightbox.querySelector('.lightbox-next');

  const items = Array.from(document.querySelectorAll('.gallery-item[data-src]'));
  let current = 0;

  function openAt(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    lbImg.src = item.dataset.src;
    lbImg.alt = item.dataset.caption || '';
    if (lbCaption) lbCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbImg.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openAt(i));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(i); }
    });
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View image: ${item.dataset.caption || 'gallery image'}`);
  });

  if (lbClose) lbClose.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  if (lbPrev) lbPrev.addEventListener('click', () => openAt(current - 1));
  if (lbNext) lbNext.addEventListener('click', () => openAt(current + 1));

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') openAt(current - 1);
    if (e.key === 'ArrowRight') openAt(current + 1);
  });
})();

/* ===== GALLERY CATEGORY FILTER ===== */
(function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');
  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = cat === 'all' || item.dataset.category === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* ===== FORM: Contact + Join Us ===== */
function initForm(formEl) {
  if (!formEl) return;
  const msgEl = formEl.querySelector('.form-message');
  const submitBtn = formEl.querySelector('.form-submit-btn');

  function showMsg(type, text) {
    if (!msgEl) return;
    msgEl.className = 'form-message ' + type;
    msgEl.textContent = text;
    msgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validate() {
    let valid = true;
    formEl.querySelectorAll('.field-error').forEach(e => e.remove());

    formEl.querySelectorAll('[required]').forEach(field => {
      const val = field.value.trim();
      if (!val) {
        valid = false;
        const err = document.createElement('span');
        err.className = 'field-error';
        err.textContent = 'This field is required.';
        field.after(err);
        field.style.borderColor = '#c0392b';
      } else {
        field.style.borderColor = '';
      }
      if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        valid = false;
        const err = document.createElement('span');
        err.className = 'field-error';
        err.textContent = 'Enter a valid email address.';
        field.after(err);
        field.style.borderColor = '#c0392b';
      }
    });
    return valid;
  }

  formEl.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;

    const action = formEl.getAttribute('action');
    if (!action || action.includes('YOUR_FORM_ID')) {
      showMsg('error', 'Form not configured yet. Please add your Formspree ID. See README.md.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(formEl),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        showMsg('success', 'Thank you! Your message has been sent. We will get back to you soon.');
        formEl.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      showMsg('error', 'Something went wrong. Please try again or email us directly at support@inamigosfoundation.org.in');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.label || 'Send Message';
    }
  });

  /* Clear per-field error on input */
  formEl.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      const err = field.nextElementSibling;
      if (err && err.classList.contains('field-error')) err.remove();
      field.style.borderColor = '';
    });
  });
}

document.querySelectorAll('.js-form').forEach(initForm);

/* ===== SMOOTH SCROLL for internal anchors ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
