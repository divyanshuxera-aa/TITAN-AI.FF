(() => {
  const overlay = document.getElementById("titan-welcome");
  if (!overlay) return;

  // Play once per page load. The overlay fades away after the intro animation.
  const hideDelay = 6700;
  const hideIntro = () => {
    overlay.classList.add("is-hidden");
  };
  window.setTimeout(hideIntro, hideDelay);

  // Preview button only; remove this block when adding the files to your real site.
  const replay = document.getElementById("replay-intro");
  if (replay) {
    replay.addEventListener("click", () => {
      overlay.classList.remove("is-hidden");
      overlay.style.animation = "none";
      void overlay.offsetWidth;
      overlay.style.animation = "";
      overlay.querySelector(".welcome-content").style.animation = "none";
      void overlay.querySelector(".welcome-content").offsetWidth;
      overlay.querySelector(".welcome-content").style.animation = "";
      window.setTimeout(hideIntro, hideDelay);
    });
  }
})();
