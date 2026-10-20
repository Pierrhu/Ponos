// ============ TIMERS ============

// ── Son de fin de repos ───────────────────────────────────────────────────────
// iOS n'autorise le son qu'après un geste de l'utilisateur : on prépare le
// contexte audio au premier tap (Commencer, ✓).
let audioCtx = null;
function unlockSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) {}
}
function playRestEndSound() {
  if (!audioCtx) return;
  try {
    const t0 = audioCtx.currentTime;
    [0, 0.18, 0.36].forEach((dt, i) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'triangle';
      o.frequency.value = i === 2 ? 1046 : 784;
      g.gain.setValueAtTime(0.0001, t0 + dt);
      g.gain.exponentialRampToValueAtTime(0.35, t0 + dt + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 0.16);
      o.connect(g).connect(audioCtx.destination);
      o.start(t0 + dt); o.stop(t0 + dt + 0.18);
    });
  } catch (e) {}
}

// ── Timer de repos ────────────────────────────────────────────────────────────
let restTimerInterval = null;
let restTimerEnd      = 0;
let restTimerDuration = 0;
const REST_RING = 2 * Math.PI * 46;

function getRestDuration(exId) {
  // Chercher dans le programme actif (inclut les programmes custom)
  for (const day of getActiveProgram()) {
    for (const ex of day.exercises) {
      if (ex.id !== exId) continue;
      if (ex.restTime) return ex.restTime;
      if (ex.topSet)   return 180;
      if (ex.superset) return 90;
      if (ex.dropSet)  return 90;
      const f = ex.format || '';
      if (f.includes('6-8') || f.includes('6-10'))  return 150;
      if (f.includes('8-10') || f.includes('10-12')) return 120;
      return 90;
    }
  }
  return 120;
}

function fmtClock(sec) {
  sec = Math.max(0, Math.round(sec));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

function startRestTimer(duration, nextLabel) {
  if (restTimerInterval) clearInterval(restTimerInterval);
  restTimerDuration = duration;
  restTimerEnd      = Date.now() + duration * 1000;

  const el  = document.getElementById('rest-timer');
  const day = getActiveProgram()[state.dayIdx];
  if (day) {
    el.style.setProperty('--acc', day.accent);
    el.style.setProperty('--acc-rgb', typeof hexToRgb === 'function' ? hexToRgb(day.accent) : '194,59,59');
  }
  document.getElementById('rest-timer-next').textContent  = nextLabel || '';
  document.getElementById('rest-timer-total').textContent = `sur ${fmtClock(duration)}`;
  el.classList.remove('finished');
  el.classList.add('active');
  tickRest();
  restTimerInterval = setInterval(tickRest, 250);
}

function tickRest() {
  const remaining = Math.max(0, (restTimerEnd - Date.now()) / 1000);
  const shown     = Math.ceil(remaining);
  document.getElementById('rest-timer-time').textContent = shown > 0 ? fmtClock(shown) : 'GO';
  const ring = document.getElementById('rest-timer-ring');
  if (ring) ring.style.strokeDashoffset = REST_RING * (1 - remaining / Math.max(restTimerDuration, 1));

  if (remaining <= 0 && restTimerInterval) {
    clearInterval(restTimerInterval);
    restTimerInterval = null;
    document.getElementById('rest-timer').classList.add('finished');
    playRestEndSound();
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    setTimeout(() => { if (!restTimerInterval) skipRestTimer(); }, 4000);
  }
}

function adjustRestTimer(deltaSec) {
  if (!restTimerInterval) return;
  restTimerEnd      += deltaSec * 1000;
  restTimerDuration  = Math.max(5, restTimerDuration + deltaSec);
  document.getElementById('rest-timer-total').textContent = `sur ${fmtClock(restTimerDuration)}`;
  tickRest();
}

function skipRestTimer() {
  if (restTimerInterval) clearInterval(restTimerInterval);
  restTimerInterval = null;
  const el = document.getElementById('rest-timer');
  if (el) el.classList.remove('active', 'finished');
}

// ── Timer de séance ───────────────────────────────────────────────────────────
// Le début de séance est enregistré : fermer l'app ou recharger ne remet pas
// le chrono à zéro.
let sessionInterval = null;
let wakeLock        = null;

function formatElapsed() {
  if (!state.sessionStart) return '00:00';
  const s = Math.floor((Date.now() - state.sessionStart) / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return (h ? h + ':' : '') + `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function runSessionClock() {
  if (sessionInterval) clearInterval(sessionInterval);
  state._sessionActive = true;
  sessionInterval = setInterval(() => {
    const el = document.getElementById('ws-session-time');
    if (el) el.textContent = formatElapsed();
  }, 1000);
  requestWakeLock();
}

function startSession() {
  if (state.sessionStart) { runSessionClock(); return; }
  state.sessionStart = Date.now();
  saveState();
  runSessionClock();
}

// Au lancement de l'app : reprendre une séance en cours
function resumeSessionIfAny() {
  if (!state.sessionStart) return;
  // Séance oubliée depuis plus de 6 h : on ne la reprend pas
  if (Date.now() - state.sessionStart > 6 * 3600 * 1000) {
    state.sessionStart = null;
    state.done = {};
    saveState();
    return;
  }
  runSessionClock();
}

function stopSession() {
  state._sessionActive = false;
  state.sessionStart = null;
  if (sessionInterval) clearInterval(sessionInterval);
  sessionInterval = null;
  saveState();
  releaseWakeLock();
}

// ── Wake Lock ─────────────────────────────────────────────────────────────────
async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    }
  } catch(e) {}
}

function releaseWakeLock() {
  if (wakeLock) { wakeLock.release(); wakeLock = null; }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && state._sessionActive) requestWakeLock();
});
