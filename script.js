const $ = (id) => document.getElementById(id);
function updateClock(){ $('clock').textContent = new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date())+' IST'; }
updateClock(); setInterval(updateClock,1000); $('year').textContent = new Date().getFullYear();
const form=$('analysis-form'), uid=$('uid'), progress=$('progress'), pct=$('progress-pct'), ptext=$('progress-text'), result=$('result');
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const value=uid.value.trim();
  if(!/^\d{5,20}$/.test(value)){result.textContent='[ ERROR ] UID must contain 5–20 digits.';return;}
  progress.style.width='0%';pct.textContent='0%';ptext.textContent='LOCAL DEMO INITIALIZED';result.textContent='[ RUNNING ] Validating UID format locally…';
  const stages=[['Checking numeric format…',28],['Preparing local interface…',62],['Demo sequence complete.',100]];
  stages.forEach(([message,amount],index)=>setTimeout(()=>{progress.style.width=amount+'%';pct.textContent=amount+'%';ptext.textContent=amount===100?'COMPLETE':'PROCESSING';result.textContent='[ DEMO ] '+message+(amount===100?' No Garena account data was requested.':'');},700*(index+1)));
});
$('proof').addEventListener('change',()=>{const file=$('proof').files[0];if(file){result.textContent='[ FILE READY ] '+file.name+' selected locally. It has not been uploaded.';}});
