const CACHE_NAME = 'tiptop-portfolio-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './main.js',
    './img/ARA.png',
    './img/BFA.png',
    './img/css-3.png',
    './img/DESISYON_Eclipse Creatives_BSIT-1B.jpg',
    './img/html-5.png',
    './img/ICVOTING.png',
    './img/java.png',
    './img/mon.jpg',
    './img/SCES.png',
    './img/Screenshot 2025-04-28 191015.png',
    './img/Screenshot 2025-04-28 191046.png',
    'https://unpkg.com/vue@3/dist/vue.global.js',
    'https://unpkg.com/lenis@1.1.20/dist/lenis.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap'
];

// Install Event: Cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event: Cache-first strategy for assets
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                // Optionally cache new requests dynamically
                if (event.request.url.startsWith('http') || event.request.url.includes('img/')) {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                }
                return fetchResponse;
            });
        }).catch(() => {
            // Fallback for offline mode if necessary
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
            }
        })
    );
});
