// 秘密の数字と隠し部屋：オフライン用（中身を変えたら CACHE の番号を上げる）
const CACHE='himitsu-suuji-v3';
const FILES=["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-maskable-192.png", "icon-maskable-512.png", "img/bust.webp", "img/bust_eyes.webp", "img/bust_mouth.webp", "img/desk.webp", "img/doctor.webp", "img/door.webp", "img/door_leaf.webp", "img/lab.webp", "img/recall.webp", "img/room.webp", "img/shelf.webp", "img/shelf_half.webp", "img/title.webp", "sfx/advanced_puzzle_unlocked.wav", "sfx/button_press.wav", "sfx/code_acquired.wav", "sfx/dial_click.wav", "sfx/doctor_talk.wav", "sfx/door_creak.wav", "sfx/hidden_room_magic.wav", "sfx/hint_used.wav", "sfx/lock_denied.wav", "sfx/lock_unlock.wav", "sfx/mistake_limit.wav", "sfx/number_correct.wav", "sfx/number_mistake.wav", "sfx/puzzle_clear.wav", "sfx/text_advance.wav", "sfx/undecided.wav", "bgm/hidden.mp3", "bgm/puzzle.mp3", "bgm/story.mp3"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('himitsu-suuji-')&&k!==CACHE&&k!=='himitsu-suuji-font').map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  // 文字（Googleフォント）は、一度読んだものを取っておく
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open('himitsu-suuji-font').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(res=>{c.put(e.request,res.clone());return res;}))));return;}
  if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
