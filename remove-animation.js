/*
TITAN.AI — Disable intro animation / ENTER overlay
Use this only if your original main website HTML is still present.
Add this file just before </body> in index.html:
<script src="remove-animation.js"></script>
*/
(() => {
  const selectors = [
    '#welcome-overlay', '#welcomeOverlay', '#intro-overlay', '#introOverlay',
    '.welcome-overlay', '.welcomeOverlay', '.intro-overlay', '.introOverlay',
    '.welcome-screen', '.intro-screen', '.enter-screen', '.landing-overlay',
    '[id*="welcome"][class*="overlay"]', '[id*="intro"][class*="overlay"]'
  ];

  function removeIntro() {
    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach(el => el.remove());
    }

    // Remove only elements that clearly look like an intro/ENTER cover.
    document.querySelectorAll('body *').forEach(el => {
      if (el.children.length > 3) return;
      const text = (el.innerText || '').trim().toLowerCase();
      const cls = (typeof el.className === 'string' ? el.className : '').toLowerCase();
      const id = (el.id || '').toLowerCase();
      const introLike = /welcome|intro|splash|landing|overlay/.test(cls + ' ' + id);
      const enterLike = text === 'enter' || text === 'tap to enter';
      if (introLike && (el.tagName === 'DIV' || el.tagName === 'SECTION' || el.tagName === 'MAIN')) {
        el.remove();
      } else if (enterLike && /button/i.test(el.tagName)) {
        const parent = el.parentElement;
        if (parent && /welcome|intro|splash|landing|overlay/i.test(
          ((typeof parent.className === 'string' ? parent.className : '') + ' ' + (parent.id || '')).toLowerCase()
        )) parent.remove();
      }
    });

    document.documentElement.classList.remove('no-scroll', 'intro-open', 'welcome-open');
    document.body?.classList.remove('no-scroll', 'intro-open', 'welcome-open');
    if (document.body) {
      document.body.style.overflow = '';
      document.body.style.position = '';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeIntro, { once: true });
  } else {
    removeIntro();
  }
  window.addEventListener('load', removeIntro, { once: true });
})();
