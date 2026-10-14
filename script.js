const $ = (id) => document.getElementById(id);
function updateClock(){ const now=new Date(); $('clock').textContent = new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now)+' IST'; $('live-date').textContent = new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',day:'2-digit',month:'short',year:'numeric'}).format(now); }
updateClock(); setInterval(updateClock,1000); $('year').textContent = new Date().getFullYear();
// Show the 30-day countdown only after the analysis sequence completes.
const countdownKey='titan_ai_30_day_deadline';
const countdownSection=$('countdown-section');
let deadline=Number(localStorage.getItem(countdownKey));
const totalWindow=30*24*60*60*1000;
function updateCountdown(){
  if(!deadline) return;
  const remaining=Math.max(0,deadline-Date.now());
  const totalSeconds=Math.floor(remaining/1000);
  const days=Math.floor(totalSeconds/86400);
  const hours=Math.floor((totalSeconds%86400)/3600);
  const minutes=Math.floor((totalSeconds%3600)/60);
  const seconds=totalSeconds%60;
  $('days').textContent=String(days).padStart(2,'0');
  $('hours').textContent=String(hours).padStart(2,'0');
  $('minutes').textContent=String(minutes).padStart(2,'0');
  $('seconds').textContent=String(seconds).padStart(2,'0');
  $('countdown-title').textContent=remaining>0?`${days} DAYS REMAINING`:'30-DAY WINDOW ENDED';
  $('countdown-progress').style.width=(remaining/totalWindow*100)+'%';
}
if(deadline && Number.isFinite(deadline) && deadline>Date.now()){ countdownSection.hidden=false; updateCountdown(); }
setInterval(updateCountdown,1000);
const form=$('analysis-form'), uid=$('uid'), progress=$('progress'), pct=$('progress-pct'), ptext=$('progress-text'), result=$('result');
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const value=uid.value.trim();
  if(!/^\d{5,20}$/.test(value)){result.textContent='[ ERROR ] UID must contain 5–20 digits.';return;}
  progress.style.width='0%';pct.textContent='0%';ptext.textContent='LOCAL CHECK INITIALIZED';result.textContent='[ RUNNING ] Validating UID format locally…';
  const stages=[['Checking numeric format…',28],['Preparing local interface…',62],['Sequence complete.',100]];
  stages.forEach(([message,amount],index)=>setTimeout(()=>{
    progress.style.width=amount+'%';pct.textContent=amount+'%';ptext.textContent=amount===100?'COMPLETE':'PROCESSING';result.textContent='[ STATUS ] '+message+(amount===100?'':'');
    if(amount===100){
      deadline=Number(localStorage.getItem(countdownKey));
      if(!deadline || !Number.isFinite(deadline) || deadline<=Date.now()){ deadline=Date.now()+totalWindow; localStorage.setItem(countdownKey,String(deadline)); }
      countdownSection.hidden=false; updateCountdown(); countdownSection.scrollIntoView({behavior:'smooth',block:'center'});
    }
  },700*(index+1)));
});
$('proof').addEventListener('change',()=>{const file=$('proof').files[0];if(file){result.textContent='[ FILE READY ] '+file.name+' selected locally. It has not been uploaded.';}});
