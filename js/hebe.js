// ============ PONT AVEC HÉBÉ ============
// Ponos et Hébé (l'app de repas, Pierrhu/Hebe) sont sur le même site, pierrhu.github.io :
// sur Android, elles partagent le localStorage. Hébé est la référence pour le poids et le
// tour de taille (elle s'en sert pour ajuster les calories) :
//   hebe_weights = { <id membre>: [{ d: 'AAAA-MM-JJ', kg }] }
//   hebe_waist   = { <id membre>: [{ d: 'AAAA-MM-JJ', cm }] }
// Ponos lit ces pesées et y ajoute celles faites chez lui. Le membre utilisé est le premier
// du foyer d'Hébé (Pierre). Si Hébé n'est pas installée, Ponos fonctionne comme avant.

const HEBE_WEIGHTS = 'hebe_weights';
const HEBE_WAIST   = 'hebe_waist';

function readLS(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }

function hebeMemberId() {
  const h = readLS('hebe_household');
  return h && h.members && h.members[0] ? h.members[0].id : null;
}

function hebeAvailable() { return !!hebeMemberId(); }

function localYMD(date) {
  const d = date ? new Date(date) : new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getHebeList(key) {
  const mid = hebeMemberId();
  if (!mid) return [];
  const all = readLS(key) || {};
  return (all[mid] || []).slice().sort((a, b) => a.d.localeCompare(b.d));
}

// Ajoute ou remplace la mesure du jour d (une seule par jour, comme dans Hébé)
function putHebeEntry(key, field, d, val) {
  const mid = hebeMemberId();
  if (!mid || !(val > 0)) return;
  const all = readLS(key) || {};
  const list = (all[mid] || []).filter(e => e.d !== d);
  list.push({ d, [field]: Math.round(val * 10) / 10 });
  list.sort((a, b) => a.d.localeCompare(b.d));
  all[mid] = list;
  try { localStorage.setItem(key, JSON.stringify(all)); } catch (e) {}
}

const getHebeWeights = () => getHebeList(HEBE_WEIGHTS);
const getHebeWaist   = () => getHebeList(HEBE_WAIST);
const saveHebeWeight = (kg, d) => putHebeEntry(HEBE_WEIGHTS, 'kg', d || localYMD(), kg);
const saveHebeWaist  = (cm, d) => putHebeEntry(HEBE_WAIST,   'cm', d || localYMD(), cm);

// Reprend la dernière pesée d'Hébé si elle est plus récente que le poids connu de Ponos.
// Renvoie true si le poids a changé.
function syncWeightFromHebe() {
  const ws = getHebeWeights();
  if (!ws.length) return false;
  const last = ws[ws.length - 1];
  if (state.bodyWeightDate && state.bodyWeightDate > last.d) return false;
  if (state.bodyWeight === last.kg && state.bodyWeightDate === last.d) return false;
  state.bodyWeight     = last.kg;
  state.bodyWeightDate = last.d;
  saveState();
  return true;
}

// Courbe commune : mesures de Ponos + celles d'Hébé, une par jour (Ponos d'abord, Hébé complète)
function mergedBodySeries(ponosKey, hebeList, hebeField) {
  const byDay = {};
  hebeList.forEach(e => { byDay[e.d] = e[hebeField]; });
  state.bodyStats.forEach(b => { const v = parseFloat(b[ponosKey]); if (v > 0) byDay[localYMD(b.date)] = v; });
  return Object.keys(byDay).sort().map(d => ({ d, val: byDay[d] }));
}

function hebeDateFr(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

// Revenir sur Ponos après une pesée dans Hébé : poids à jour
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && typeof render === 'function' && syncWeightFromHebe()) render();
});
