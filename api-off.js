/* TITAN FF — API lookup off switch
   Add this file to your site and include it just before </body> in index.html.
   This hides common UID/API lookup panels and API-load error messages. It does not
   delete your existing API code; follow README.txt to remove the exact API script safely.
*/
(() => {
  const hideApiUi = () => {
    const selectors = [
      '#uid-lookup', '#uidLookup', '#api-lookup', '#apiLookup',
      '.uid-lookup', '.api-lookup', '[data-feature="uid-lookup"]',
      '[data-feature="api-lookup"]'
    ];
    document.querySelectorAll(selectors.join(',')).forEach((el) => {
      el.hidden = true;
      el.setAttribute('aria-hidden', 'true');
    });

    // Hide only the known API/CORS warning text, not general site errors.
    document.querySelectorAll('body *').forEach((el) => {
      if (el.children.length === 0) {
        const text = (el.textContent || '').trim();
        if (/some api data could not be loaded|blocks browser requests \(cors\)|api service is offline/i.test(text)) {
          el.hidden = true;
        }
      }
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideApiUi, { once: true });
  } else {
    hideApiUi();
  }
})();
