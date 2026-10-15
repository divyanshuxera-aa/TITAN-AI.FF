(() => {
  const overlay = document.getElementById("titan-welcome");
  const enter = document.getElementById("titan-enter");
  if (!overlay || !enter) return;

  // Remove the intro overlay and restore scrolling so the real page underneath is visible.
  function revealMainWebsite() {
    overlay.style.transition = "opacity .25s ease";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    window.setTimeout(() => {
      overlay.remove();
      document.body.classList.remove("intro-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.visibility = "";
      document.body.style.opacity = "";
      document.body.style.background = "";
    }, 270);
  }

  enter.addEventListener("click", revealMainWebsite, { once: true });
})();