const $ = id => document.getElementById(id);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

$('analysisForm').addEventListener('submit', async event => {
  event.preventDefault();
  const uid = $('uid').value.trim();
  if (!/^\d{8,12}$/.test(uid)) {
    $('uid').setCustomValidity('Please enter an 8 to 12 digit numeric UID.');
    $('uid').reportValidity(); $('uid').setCustomValidity(''); return;
  }
  $('results').classList.remove('hidden');
  $('runBtn').disabled = true;
  $('progress').style.width = '0%';
  $('log').textContent = '';
  const lines = [
    '[OK] Local input format validated.',
    '[OK] Date field received.',
    '[INFO] ' + ($('file').files[0] ? 'Selected file: ' + $('file').files[0].name : 'No optional file selected.'),
    '[DEMO] No external server or account was contacted.',
    '[COMPLETE] Browser-only demonstration finished.'
  ];
  for (let i = 0; i < lines.length; i++) {
    await sleep(450);
    $('progress').style.width = ((i + 1) * 20) + '%';
    $('progressText').textContent = 'Simulated sequence: ' + ((i + 1) * 20) + '%';
    const row = document.createElement('div');
    row.className = 'ok'; row.textContent = lines[i]; $('log').appendChild(row);
  }
  $('runBtn').disabled = false;
  $('runBtn').textContent = 'EXECUTION COMPLETE — RUN AGAIN';
});

$('authBtn').addEventListener('click', () => {
  const alias = $('alias').value.trim();
  if (!alias) { $('alias').focus(); $('alias').placeholder = 'Please enter an alias first'; return; }
  const token = 'TITAN-DEMO-' + Math.random().toString(36).slice(2, 10).toUpperCase();
  const result = $('authResult');
  result.classList.remove('hidden');
  result.replaceChildren();
  const heading = document.createElement('h3'); heading.textContent = 'DEMO TOKEN GENERATED'; result.appendChild(heading);
  const line = document.createElement('div'); line.className = 'log'; line.textContent = 'Operator: ' + alias; result.appendChild(line);
  const tokenLine = document.createElement('div'); tokenLine.className = 'log ok'; tokenLine.textContent = token; result.appendChild(tokenLine);
  const note = document.createElement('div'); note.className = 'notice'; note.textContent = 'This token is for visual testing only and is not a real login credential.'; result.appendChild(note);
  $('monitorBtn').classList.remove('hidden');
});
$('monitorBtn').addEventListener('click', () => {
  const results = $('results');
  results.classList.remove('hidden');
  $('progressText').textContent = 'Monitor preview opened.';
  $('progress').style.width = '100%';
  $('log').textContent = 'DEMO MONITOR ACTIVE — no live account or network data is accessed.';
  window.scrollTo({top: results.getBoundingClientRect().top + window.scrollY - 20, behavior:'smooth'});
});

/* ===== Original shared countdown timer logic (unchanged) ===== */

// Fixed deadline: same for every visitor, independent of browser localStorage.
// Change this ISO date to set a different shared end date.
(function(){
  const sharedDeadline = new Date('2026-11-14T23:59:59Z').getTime();
  const ids = {days: document.getElementById('titan-days'), hours: document.getElementById('titan-hours'), minutes: document.getElementById('titan-minutes'), seconds: document.getElementById('titan-seconds')};
  function updateSharedTimer(){
    let remaining = Math.max(0, sharedDeadline - Date.now());
    const days = Math.floor(remaining / 86400000); remaining %= 86400000;
    const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
    const minutes = Math.floor(remaining / 60000); remaining %= 60000;
    const seconds = Math.floor(remaining / 1000);
    ids.days.textContent = String(days).padStart(2,'0');
    ids.hours.textContent = String(hours).padStart(2,'0');
    ids.minutes.textContent = String(minutes).padStart(2,'0');
    ids.seconds.textContent = String(seconds).padStart(2,'0');
  }
  updateSharedTimer(); setInterval(updateSharedTimer,1000);
})();
