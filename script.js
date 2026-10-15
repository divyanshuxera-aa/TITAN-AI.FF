const $ = (id) => document.getElementById(id);
$('year').textContent = new Date().getFullYear();

const PROFILE_API = 'https://freefireinfo-zy9l.onrender.com/api/v1/player-profile';
const BAN_API = 'https://api2.nftoken.info/checkbanned';

function first(...values) { return values.find(v => v !== undefined && v !== null && v !== ''); }
function textValue(value, fallback = '—') { return value === undefined || value === null || value === '' ? fallback : String(value); }
function unwrapProfile(json) {
  return json?.data || json?.player || json;
}
function normalizeProfile(json) {
  const root = unwrapProfile(json);
  const basic = root?.basicinfo || root?.basicInfo || root?.playerInfo || root?.player_info || root;
  const clan = root?.claninfo || root?.clanInfo || root?.clanBasicInfo || root?.guild || {};
  const profile = root?.profileinfo || root?.profileInfo || {};
  return {
    uid: first(basic?.accountid, basic?.accountId, basic?.uid, basic?.player_id),
    name: first(basic?.nickname, basic?.name, root?.nickname),
    level: first(basic?.level, root?.level),
    region: first(basic?.region, root?.region),
    rank: first(basic?.rankingpoints, basic?.rankingPoints, basic?.rank, root?.rank),
    avatarId: first(basic?.headpic, basic?.headPic, profile?.avatarId, profile?.avatarid, root?.avatarId),
    bannerId: first(basic?.bannerid, basic?.bannerId, profile?.bannerId, profile?.bannerid, root?.bannerId),
    guild: first(clan?.clanname, clan?.clanName, clan?.name, root?.clanName)
  };
}
function normalizeBan(json) {
  const d = json?.data || json?.result || json;
  const label = first(d?.ban_status, d?.banStatus, d?.status_text, d?.statusText);
  const isBanned = first(d?.is_banned, d?.isBanned, d?.banned);
  const period = first(d?.ban_period, d?.banPeriod, d?.period);
  if (label && !['success', 'ok'].includes(String(label).toLowerCase())) {
    const low = String(label).toLowerCase();
    if (low.includes('not banned') || low.includes('unbanned')) return {label:'NOT BANNED', period:'No ban reported by this API.', state:'ok'};
    if (low.includes('permanent') || low.includes('indefinitely')) return {label:'PERMANENT BAN REPORTED', period:textValue(period, 'API reports an indefinite ban.'), state:'bad'};
    if (low.includes('banned')) return {label:'BAN REPORTED', period:textValue(period, 'Duration not provided.'), state:'bad'};
  }
  if (isBanned === false || isBanned === 0 || isBanned === '0') return {label:'NOT BANNED', period:'No ban reported by this API.', state:'ok'};
  if (isBanned === true || isBanned === 1 || isBanned === '1') {
    const p = period === undefined || period === null || period === 0 || period === '0' ? '' : String(period);
    return {label:'BAN REPORTED', period:p ? `Reported ban period: ${p}` : 'API reports a ban but did not provide a duration.', state:'bad'};
  }
  return {label:'UNKNOWN', period:'The API did not return a recognizable ban status.', state:'unknown'};
}
async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 18000);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { 'Accept': 'application/json' } });
    if (!response.ok) throw new Error(`API returned HTTP ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timer); }
}
function showBan(result) {
  $('banStatus').textContent = result.label;
  $('banPeriod').textContent = result.period;
  $('banIcon').textContent = result.state === 'ok' ? '✓' : result.state === 'bad' ? '!' : '?';
  $('banIcon').className = `shield ${result.state === 'ok' ? 'ok' : result.state === 'bad' ? 'bad' : ''}`;
}
function renderProfile(p, requestedUid, selectedRegion) {
  $('playerName').textContent = textValue(p.name, 'Player name unavailable');
  $('playerUid').textContent = textValue(p.uid, requestedUid);
  $('level').textContent = textValue(p.level);
  $('playerRegion').textContent = textValue(p.region, selectedRegion);
  $('rank').textContent = textValue(p.rank);
  $('avatarId').textContent = textValue(p.avatarId);
  $('bannerId').textContent = textValue(p.bannerId);
  $('guild').textContent = textValue(p.guild, 'Not provided by API');
  const initial = textValue(p.name, '?').trim().charAt(0).toUpperCase() || '?';
  $('avatarInitial').textContent = initial;
  $('result').classList.remove('hidden');
}
$('lookupForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const uid = $('uid').value.trim();
  const region = $('region').value;
  if (!/^\d{5,20}$/.test(uid)) {
    $('notice').textContent = 'Please enter a numeric UID between 5 and 20 digits.';
    $('notice').className = 'notice error';
    return;
  }
  $('searchBtn').disabled = true;
  $('searchBtn').textContent = 'CHECKING…';
  $('notice').textContent = 'Checking public profile and ban status…';
  $('notice').className = 'notice';
  $('result').classList.add('hidden');
  showBan({label:'CHECKING…',period:'Waiting for the ban-check API.',state:'unknown'});
  try {
    const profileUrl = `${PROFILE_API}?uid=${encodeURIComponent(uid)}&server=${encodeURIComponent(region)}&need_gallery_info=false&need_blacklist=false`;
    const banUrl = `${BAN_API}?id=${encodeURIComponent(uid)}`;
    const results = await Promise.allSettled([fetchJson(profileUrl), fetchJson(banUrl)]);
    let gotProfile = false;
    if (results[0].status === 'fulfilled') {
      const p = normalizeProfile(results[0].value);
      if (p.name || p.level || p.uid) { renderProfile(p, uid, region); gotProfile = true; }
    }
    if (results[1].status === 'fulfilled') showBan(normalizeBan(results[1].value));
    else showBan({label:'UNKNOWN',period:'Ban-check API unavailable or blocked by the browser.',state:'unknown'});
    if (!gotProfile) {
      $('result').classList.remove('hidden');
      $('playerName').textContent = 'Profile unavailable';
      $('playerUid').textContent = uid;
      $('avatarInitial').textContent = '?';
      $('level').textContent = '—'; $('playerRegion').textContent = region; $('rank').textContent = '—';
      $('avatarId').textContent = '—'; $('bannerId').textContent = '—'; $('guild').textContent = 'Profile API unavailable or UID not found';
    }
    const profileFailed = results[0].status === 'rejected';
    const banFailed = results[1].status === 'rejected';
    $('notice').textContent = profileFailed || banFailed
      ? 'Some API data could not be loaded. This can happen if the service is offline or blocks browser requests (CORS). See README for next steps.'
      : 'Lookup complete. Check the notes below; third-party results are not guaranteed to be accurate.';
    if (profileFailed || banFailed) $('notice').className = 'notice error';
  } catch (error) {
    $('notice').textContent = 'Lookup failed. The API may be offline or block browser requests. Try again later.';
    $('notice').className = 'notice error';
  } finally {
    $('searchBtn').disabled = false;
    $('searchBtn').innerHTML = 'CHECK UID <span>↗</span>';
  }
});
