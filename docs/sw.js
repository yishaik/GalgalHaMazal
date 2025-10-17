const CACHE = 'ghm-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/overview.html',
  '/architecture.html',
  '/wiring.html',
  '/bom.html',
  '/gallery.html',
  '/docs.html',
  '/missing.html',
  '/simulator.html',
  '/assets/site.css',
  '/assets/site.js',
  '/assets/favicon.svg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const req = e.request;
  e.respondWith(
    caches.match(req).then(res => res || fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => { if (req.method==='GET' && resp.ok) c.put(req, copy); });
      return resp;
    }).catch(()=> caches.match('/index.html')))
  );
});

