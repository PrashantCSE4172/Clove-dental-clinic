// Simple DOM helpers
const qs = (sel, ctx=document) => ctx.querySelector(sel);
const qsa = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// NAV toggle for mobile
const navToggle = qs('#navToggle');
const nav = qs('#nav');
navToggle && navToggle.addEventListener('click', () => {
  const opened = nav.classList.toggle('nav--open');
  navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  // simple slide-in using inline styles if open
  if (opened) {
    nav.style.position = 'absolute';
    nav.style.top = '68px';
    nav.style.right = '20px';
    nav.style.background = '#fff';
    nav.style.padding = '12px';
    nav.style.borderRadius = '8px';
    nav.style.boxShadow = '0 12px 28px rgba(0,0,0,0.08)';
  } else {
    nav.style = '';
  }
});

// Smooth scrolling for internal links
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({behavior:'smooth', block: 'start'});
      // close nav on mobile
      if (nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
        navToggle.setAttribute('aria-expanded','false');
        nav.style = '';
      }
    }
  });
});

// FAQ accordion with keyboard accessibility
const faqList = qs('#faqList');
if (faqList) {
  faqList.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq__q');
    if (!btn) return;
    const item = btn.closest('.faq__item');
    const panel = item.querySelector('.faq__a');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    if (isOpen) {
      panel.hidden = true;
    } else {
      panel.hidden = false;
      panel.focus?.();
    }
  });

  // keyboard support: Enter and Space toggle
  qsa('.faq__q', faqList).forEach(btn => {
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        btn.click();
      }
    });
  });
}

// Simple "on-scroll" reveal (performance friendly)
const revealElems = qsa('.card, .feature-card, .transform__item, .hero__content');
const onScroll = () => {
  const top = window.scrollY + window.innerHeight * 0.9;
  revealElems.forEach(el => {
    if (el.getBoundingClientRect().top + window.scrollY < top) {
      el.style.opacity = 1;
      el.style.transform = 'none';
      el.style.transition = 'opacity 600ms ease, transform 600ms ease';
    }
  });
};
revealElems.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(12px)';
});
window.addEventListener('load', onScroll);
window.addEventListener('scroll', onScroll);
