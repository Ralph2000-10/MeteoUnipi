// Fetch weather.json (from your repo root) every 2 minutes.
const statusEl = document.getElementById('status');
const updatedEl = document.getElementById('updated');
const gridEl = document.getElementById('grid');


async function fetchWeather() {
try {
const res = await fetch('./weather.json', { cache: 'no-store' });
if (!res.ok) throw new Error('HTTP ' + res.status);
const data = await res.json();


const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val ?? '—'; };
set('temperatura', data.temperatura);
set('umidita', data.umidita);
set('pressione', data.pressione || data.pressone || data.pressure || data.pression || data.pressionee || data['pressione']);
set('radiazione', data.radiazione);
set('vento', data.vento);


gridEl.style.display = 'grid';
statusEl.textContent = 'Online';
updatedEl.textContent = new Date().toLocaleTimeString();
} catch (e) {
statusEl.textContent = 'Offline: dati in cache (se disponibili)';
updatedEl.textContent = new Date().toLocaleTimeString();
}
}


fetchWeather();
setInterval(fetchWeather, 120000); // 2 minuti


// A2HS (Add to Home Screen) prompt
let deferredPrompt;
const btnInstall = document.getElementById('btnInstall');
window.addEventListener('beforeinstallprompt', (e) => {
e.preventDefault();
deferredPrompt = e;
btnInstall.hidden = false;
});
btnInstall.addEventListener('click', async () => {
if (!deferredPrompt) return;
deferredPrompt.prompt();
await deferredPrompt.userChoice; // result.outcome: 'accepted' | 'dismissed'
deferredPrompt = null;
btnInstall.hidden = true;
});