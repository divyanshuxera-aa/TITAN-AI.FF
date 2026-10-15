(() => {
  const overlay = document.getElementById("titan-welcome");
  const enterButton = document.getElementById("enter-titan");
  if (!overlay || !enterButton) return;

  // Important: there is NO timer that closes the welcome screen.
  // The main website is revealed only after the visitor presses ENTER.
  const enterSite = () => {
    if (overlay.classList.contains("is-exiting")) return;
    overlay.classList.add("is-exiting");
    enterButton.disabled = true;
    window.setTimeout(() => {
      overlay.remove();
      document.body.classList.remove("intro-open");
    }, 800);
  };

  document.body.classList.add("intro-open");
  enterButton.addEventListener("click", enterSite);
  enterButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      enterSite();
    }
  });
})();
