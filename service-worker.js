// Basic service worker: cache app shell; network-first for weather.json
const CACHE_NAME = 'meteo-pisa-v1';
const APP_SHELL = [
'./',
'./index.html',
'./app.js',
'./manifest.webmanifest',
'./icons/icon-192.png',
'./icons/icon-512.png'
];


self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
);
});


self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
);
});


self.addEventListener('fetch', (event) => {
const { request } = event;
const url = new URL(request.url);


// Network-first for weather.json to get fresh data; fallback to cache
if (url.pathname.endsWith('/weather.json') || url.pathname.endsWith('weather.json')) {
event.respondWith(
fetch(request).then((res) => {
const resClone = res.clone();
caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
return res;
}).catch(() => caches.match(request))
);
return;
}


// Cache-first for app shell
event.respondWith(
caches.match(request).then((cached) => cached || fetch(request))
);
});




# Folder: icons/
# Place two PNG files here:
# - icons/icon-192.png (192x192)
# - icons/icon-512.png (512x512)
# You can create them from any square logo (e.g., using https://favicon.io or https://realfavicongenerator.net). Replace the placeholders with your own.