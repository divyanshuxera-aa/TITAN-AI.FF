const $ = (id) => document.getElementById(id);

function updateClock() {
  const now = new Date();
  $("clock").textContent =
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(now) + " IST";

  $("live-date").textContent = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(now);
}

updateClock();
setInterval(updateClock, 1000);
$("year").textContent = new Date().getFullYear();

const countdownKey = "titan_ai_30_day_deadline";
const countdownSection = $("countdown-section");
const totalWindow = 30 * 24 * 60 * 60 * 1000;

let deadline = null;
let countdownInterval = null;
let stageTimeouts = [];

function updateCountdown() {
  if (!deadline) return;

  const remaining = Math.max(0, deadline - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  $("days").textContent = String(days).padStart(2, "0");
  $("hours").textContent = String(hours).padStart(2, "0");
  $("minutes").textContent = String(minutes).padStart(2, "0");
  $("seconds").textContent = String(seconds).padStart(2, "0");
  $("countdown-title").textContent =
    remaining > 0 ? `${days} DAYS REMAINING` : "30-DAY WINDOW ENDED";
  $("countdown-progress").style.width =
    Math.min(100, Math.max(0, remaining / totalWindow * 100)) + "%";
}

function startCountdownAfterSubmit() {
  // Start a fresh 30-day timer only after the form submission sequence completes.
  deadline = Date.now() + totalWindow;
  localStorage.setItem(countdownKey, String(deadline));
  countdownSection.hidden = false;
  updateCountdown();

  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
  countdownSection.scrollIntoView({ behavior: "smooth", block: "center" });
}

const form = $("analysis-form");
const uid = $("uid");
const progress = $("progress");
const pct = $("progress-pct");
const ptext = $("progress-text");
const result = $("result");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Let browser-required fields and the UID pattern validate before starting anything.
  if (!form.reportValidity()) return;

  const value = uid.value.trim();
  if (!/^\d{5,20}$/.test(value)) {
    result.textContent = "[ ERROR ] UID must contain 5–20 digits.";
    uid.focus();
    return;
  }

  // Clear any old sequence if the user submits again.
  stageTimeouts.forEach(clearTimeout);
  stageTimeouts = [];
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }

  // Hide/reset the timer while the form is being processed.
  deadline = null;
  countdownSection.hidden = true;
  localStorage.removeItem(countdownKey);

  submitButton.disabled = true;
  progress.style.width = "0%";
  pct.textContent = "0%";
  ptext.textContent = "LOCAL CHECK INITIALIZED";
  result.textContent = "[ RUNNING ] Validating UID format locally…";

  const stages = [
    ["Checking numeric format…", 28],
    ["Preparing account review status…", 62],
    ["Your account review request is ready. Submit it through official Garena Support.", 100]
  ];

  stages.forEach(([message, amount], index) => {
    const timeout = setTimeout(() => {
      progress.style.width = amount + "%";
      pct.textContent = amount + "%";
      ptext.textContent = amount === 100 ? "COMPLETE" : "PROCESSING";
      result.textContent = "[ STATUS ] " + message;

      if (amount === 100) {
        startCountdownAfterSubmit();
        submitButton.disabled = false;
      }
    }, 700 * (index + 1));

    stageTimeouts.push(timeout);
  });
});

$("proof").addEventListener("change", () => {
  const file = $("proof").files[0];
  if (file) {
    result.textContent =
      "[ FILE READY ] " + file.name + " selected locally. It has not been uploaded.";
  }
});
