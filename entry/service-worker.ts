const CACHE = 'cache-only-v1';

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event: any) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([
                '/free',
                '/main.js',
                '/worker.js',
                '/manifest.json',
                '/robots.txt',
                '/gm.jpg',
            ]);
        })
    );
});

// При запросе на сервер (событие fetch), используем только данные из кэша.
self.addEventListener('fetch', (event: any) => {
    event.respondWith(fromCache(event.request).catch(e => fetch(event.request)));
});

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
        cache.match(request)
            .then((matching: any) => matching || Promise.reject(`no-match, ${request.url}`))
    );
}