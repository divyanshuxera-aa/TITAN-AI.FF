document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const form = $('analysis-form');
  const uid = $('uid');
  const progress = $('progress');
  const pct = $('progress-pct');
  const ptext = $('progress-text');
  const result = $('result');
  const overlay = $('scan-overlay');
  const scanPct = $('scan-pct');
  const scanTitle = $('scan-title');
  const scanStatus = $('scan-status');
  const countdownSection = $('countdown-section');
  const DURATION = 30 * 24 * 60 * 60 * 1000;
  const STORE_KEY = 'titan_ai_countdown_start_v1';
  let running = false;

  function updateClock() {
    const now = new Date();
    if ($('clock')) $('clock').textContent = new Intl.DateTimeFormat('en-IN', {timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false}).format(now) + ' IST';
    if ($('live-date')) $('live-date').textContent = new Intl.DateTimeFormat('en-IN', {timeZone:'Asia/Kolkata', day:'2-digit', month:'short', year:'numeric'}).format(now);
    if ($('year')) $('year').textContent = now.getFullYear();
  }
  updateClock(); setInterval(updateClock, 1000);

  function showCountdown() {
    let start = 0;
    try { start = Number(localStorage.getItem(STORE_KEY)); } catch (_) {}
    if (!start || !Number.isFinite(start) || !countdownSection) return;
    countdownSection.hidden = false;
    const left = Math.max(0, start + DURATION - Date.now());
    $('days').textContent = String(Math.floor(left / 86400000)).padStart(2,'0');
    $('hours').textContent = String(Math.floor(left % 86400000 / 3600000)).padStart(2,'0');
    $('minutes').textContent = String(Math.floor(left % 3600000 / 60000)).padStart(2,'0');
    $('seconds').textContent = String(Math.floor(left % 60000 / 1000)).padStart(2,'0');
    $('countdown-title').textContent = left ? '30-DAY SESSION WINDOW' : 'SESSION WINDOW ENDED';
    $('countdown-progress').style.width = `${Math.max(0, Math.min(100, left / DURATION * 100))}%`;
  }
  showCountdown(); setInterval(showCountdown, 1000);

  const steps = [
    {at: 5, title:'INITIALIZING INTERFACE', status:'Preparing local validation sequence…'},
    {at: 20, title:'CHECKING YOUR ID', status:'Checking your ID format locally in this browser…'},
    {at: 42, title:'VERIFYING FORM FIELDS', status:'Confirming required fields are complete…'},
    {at: 64, title:'RUNNING LOCAL CHECK', status:'This page does not connect to Free Fire game servers…'},
    {at: 82, title:'30-DAY COUNTDOWN', status:'After 30 days, check your account status with official Free Fire support. An unban is not guaranteed.'},
    {at: 100, title:'LOCAL CHECK COMPLETE', status:'UID format check completed successfully.'}
  ];

  function runAnimation() {
    running = true;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scan-running');
    let index = 0;
    const started = performance.now();
    const total = 5200;
    scanTitle.textContent = 'INITIALIZING INTERFACE';
    scanStatus.textContent = 'Preparing local validation sequence…';
    scanPct.textContent = '0%';
    $('scan-progress').style.width = '0%';
    const tick = (now) => {
      const amount = Math.min(100, Math.floor((now - started) / total * 100));
      while (index < steps.length && amount >= steps[index].at) {
        scanTitle.textContent = steps[index].title;
        scanStatus.textContent = steps[index].status;
        index++;
      }
      scanPct.textContent = amount + '%';
      $('scan-progress').style.width = amount + '%';
      progress.style.width = amount + '%';
      pct.textContent = amount + '%';
      ptext.textContent = amount === 100 ? 'COMPLETE' : 'PROCESSING';
      if (amount < 100) requestAnimationFrame(tick);
      else setTimeout(() => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('scan-running');
        running = false;
        result.textContent = '[ COMPLETE ] ID format checked locally. The 30-day timer is only a reminder; it cannot unban an account or guarantee an unban.';
        try { if (!localStorage.getItem(STORE_KEY)) localStorage.setItem(STORE_KEY, String(Date.now())); } catch (_) {}
        showCountdown();
        result.scrollIntoView({behavior:'smooth', block:'center'});
      }, 700);
    };
    requestAnimationFrame(tick);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (running) return;
    const value = uid.value.trim();
    if (!/^\d{5,20}$/.test(value)) {
      result.textContent = '[ ERROR ] Enter a UID containing 5–20 digits.';
      uid.focus(); return;
    }
    result.textContent = '[ RUNNING ] Local UID format check in progress…';
    runAnimation();
  });

  $('proof').addEventListener('change', () => {
    const file = $('proof').files && $('proof').files[0];
    if (file) result.textContent = '[ FILE SELECTED ] Reference image stays on this device and is not uploaded.';
  });
});
