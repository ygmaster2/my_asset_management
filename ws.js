const CACHE_NAME = 'asset-mgr-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json'
];

// 서비스 워커 설치 및 리소스 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 네트워크 요청 가로채기 (오프라인 지원의 핵심)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});