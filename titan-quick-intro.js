(() => {
  const overlay = document.getElementById("titan-welcome");
  const enter = document.getElementById("titan-enter");
  if (!overlay || !enter) return;
  enter.addEventListener("click", () => {
    overlay.classList.add("tw-hide");
    window.setTimeout(() => overlay.remove(), 400);
  }, { once: true });
})();