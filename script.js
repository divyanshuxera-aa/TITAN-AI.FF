// TITAN FF — minimal page behavior.
// Countdown timer logic remains in index.html exactly as in the original file.
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
});
