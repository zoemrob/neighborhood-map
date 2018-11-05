const apiPrefix = 'http://localhost:6001/search/';
const staticPrefix = 'http://localhost:3000/';

const staticFiles = [
    '/',
    '/favicon.ico',
    '/index.html',
    '/manifest.json',
    '/yelpresources/Yelp_burst_positive_RGB.png',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js', // to cache whichever one generates
    '/static/js/1.chunk.js',
    'https://fonts.googleapis.com/css?family=Playfair+Display'
];

const imgParts = [
    '0',
    '1',
    '1_half',
    '2',
    '2_half',
    '3',
    '3_half',
    '4',
    '4_half',
    '5'
];

function makeStaticUrls (imgparts, statics) {
    const prefix = 'yelpresources/regular_';
    const suffix = '.png';
    const firstSet = imgparts.map(img => staticPrefix + prefix + img + suffix);
    const secondSet = imgparts.map(img => staticPrefix + prefix + img + '@2x' + suffix);
    return [...firstSet, ...secondSet, ...statics]
}

const staticCacheName = 'static-assets-v1.4';
const staticCacheUrls = makeStaticUrls(imgParts, staticFiles);

const dynamicCacheName = 'dynamic-cache-v1';

const allCaches = [
    staticCacheName,
    dynamicCacheName
];

// staches statics
self.addEventListener('install', function (evt) {
    evt.waitUntil(
        caches.open(staticCacheName).then(staticCache => staticCache.addAll(staticCacheUrls))
    )
});

self.addEventListener('activate', function(evt) {
    const preCache = async () => {
        const storedCaches = await caches.keys();
        return Promise.all(storedCaches.filter(stored => !allCaches.includes(stored)).map(stored => caches.delete(stored)));
    };
    evt.waitUntil(preCache());
});

self.addEventListener('fetch', function(evt) {
    if (evt.request.url.includes(apiPrefix)) {
        const fetchAndCache = async (req) => {
            try {
                const cache = await caches.open(dynamicCacheName);
                const res = await cache.match(req);

                if (res) return res;
                else {
                    const fetchRes = await fetch(req);
                    cache.put(req, fetchRes.clone());
                    console.log('Cached response from ' + req.url);
                    return fetchRes;
                }
            } catch (e) {
                console.log('Error fetching from cache.', e)   ;
            }
        };
        evt.respondWith(fetchAndCache(evt.request));
    } else {
        evt.respondWith(caches.open(staticCacheName)
            .then(cache => cache.match(evt.request)
                .then(res => res || fetch(evt.request))
            )
        )
    }
});

self.addEventListener('message', function(message) {
    switch (message.data.type) {
        case 'skip':
            self.skipWaiting().then(() => (console.log('New Service Worker skipped waiting.')))
                .catch(err => console.log('New Service Worker failed to skip waiting.', err));
            break;
        default:
            console.log('Message type: ' + message.data.type + ' not handled by service worker.');
    } 
});