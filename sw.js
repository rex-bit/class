// Rolling Kelas service worker: lets the app open offline. Network-first so updates always win.
const V='rk-v2';
const FILES=['./','index.html','manifest.webmanifest','sounds/applause.mp3','icons/icon-192.png','icons/icon-512.png',
 'terms.html','about.html','changelog.html','roadmap.html','report-bug.html',
 'assets/site.css','assets/init.js','assets/config.js','assets/site.js','assets/changelog.js','assets/roadmap.js','assets/report.js','data/changelog.js','data/roadmap.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin||r.headers.has('range'))return;
  e.respondWith(fetch(r).then(res=>{
    if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}
    return res;
  }).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));
});
