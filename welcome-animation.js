(() => {
  const overlay = document.getElementById('titan-welcome');
  const enter = document.getElementById('enter-titan');
  if (!overlay || !enter) return;
  const closeIntro = () => {
    overlay.classList.add('is-hidden');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  document.body.style.overflow = 'hidden';
  enter.addEventListener('click', closeIntro);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !overlay.classList.contains('is-hidden')) closeIntro();
    if (event.key === 'Escape' && !overlay.classList.contains('is-hidden')) closeIntro();
  });
})();
