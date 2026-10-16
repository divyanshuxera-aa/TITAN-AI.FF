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

function updateClock(){
  const now = new Date();
  $('clock').textContent = new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now)+' IST';
  $('live-date').textContent = new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',day:'2-digit',month:'short',year:'numeric'}).format(now);
}
updateClock(); setInterval(updateClock,1000); $('year').textContent = new Date().getFullYear();

function showCountdown(){
  const start = Number(localStorage.getItem(STORE_KEY));
  if(!start || !Number.isFinite(start)) return;
  countdownSection.hidden = false;
  const left = Math.max(0, start + DURATION - Date.now());
  const days = Math.floor(left / 86400000);
  const hours = Math.floor(left % 86400000 / 3600000);
  const minutes = Math.floor(left % 3600000 / 60000);
  const seconds = Math.floor(left % 60000 / 1000);
  $('days').textContent = String(days).padStart(2,'0');
  $('hours').textContent = String(hours).padStart(2,'0');
  $('minutes').textContent = String(minutes).padStart(2,'0');
  $('seconds').textContent = String(seconds).padStart(2,'0');
  $('countdown-title').textContent = left ? '30-DAY SESSION WINDOW' : 'SESSION WINDOW ENDED';
  $('countdown-progress').style.width = `${Math.min(100, Math.max(0, (left / DURATION) * 100))}%`;
}
showCountdown(); setInterval(showCountdown,1000);

const steps = [
  {at: 8, title:'INITIALIZING INTERFACE', status:'Preparing local validation sequence…'},
  {at: 25, title:'CHECKING YOUR ID', status:'Checking your ID format locally in this browser…'},
  {at: 47, title:'VERIFYING FORM FIELDS', status:'Confirming required fields are complete…'},
  {at: 69, title:'RUNNING LOCAL CHECK', status:'No connection to game servers is made…'},
  {at: 88, title:'30-DAY COUNTDOWN', status:'After 30 days, check your account status with official Free Fire support. Unban is not guaranteed.'},
  {at:100, title:'LOCAL CHECK COMPLETE', status:'UID format check completed successfully.'}
];
function runAnimation(value){
  running = true;
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden','false');
  document.body.classList.add('scan-running');
  let index = 0;
  const start = Date.now();
  const total = 4800;
  const tick = () => {
    const elapsed = Date.now() - start;
    const amount = Math.min(100, Math.round(elapsed / total * 100));
    while(index < steps.length && amount >= steps[index].at){
      scanTitle.textContent = steps[index].title;
      scanStatus.textContent = steps[index].status;
      index++;
    }
    scanPct.textContent = amount + '%';
    $('scan-progress').style.width = amount + '%';
    progress.style.width = amount + '%';
    pct.textContent = amount + '%';
    ptext.textContent = amount === 100 ? 'COMPLETE' : 'PROCESSING';
    if(amount < 100){ requestAnimationFrame(tick); }
    else {
      setTimeout(() => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden','true');
        document.body.classList.remove('scan-running');
        running = false;
        result.textContent = '[ COMPLETE ] ID format checked locally. This countdown cannot unban an account or guarantee an unban after 30 days.';
        result.scrollIntoView({behavior:'smooth', block:'center'});
        if(!localStorage.getItem(STORE_KEY)) localStorage.setItem(STORE_KEY, String(Date.now()));
        showCountdown();
      }, 650);
    }
  };
  scanTitle.textContent = 'INITIALIZING INTERFACE';
  scanStatus.textContent = 'Preparing local validation sequence…';
  scanPct.textContent = '0%'; $('scan-progress').style.width = '0%';
  requestAnimationFrame(tick);
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if(running) return;
  const value = uid.value.trim();
  if(!/^\d{5,20}$/.test(value)){
    result.textContent = '[ ERROR ] Enter a UID containing 5–20 digits.';
    uid.focus(); return;
  }
  result.textContent = '[ RUNNING ] Local UID format check in progress…';
  runAnimation(value);
});
$('proof').addEventListener('change', () => {
  const file = $('proof').files[0];
  if(file) result.textContent = '[ FILE SELECTED ] Reference image stays on this device and is not uploaded.';
});
