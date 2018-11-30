declare const Env;
const CACHE = `cache-only-v${Env.build}`;

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event: any) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([
                '/wl/home',
                '/wl/free',
                '/wl/profile',
                '/wl/main.js',
                '/wl/worker.js',
                '/wl/manifest.json',
                '/wl/robots.txt',
                '/wl/gm.jpg',
            ]);
        })
    );
});

// При запросе на сервер (событие fetch), используем только данные из кэша.
self.addEventListener('fetch', (event: any) => {
    event.respondWith(fromCache(event.request).catch(e => fetch(event.request)));
    caches.open(CACHE).then(function (cache) {
        return fetch(event.request).then(function (response) {
            return cache.put(event.request, response.clone()).then(function () {
                return response;
            });
        });
    });
});

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
        cache.match(request)
            .then((matching: any) => matching || Promise.reject(`no-match, ${request.url}`))
    );
}