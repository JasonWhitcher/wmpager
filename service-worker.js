/*
	Service Worker for WM Pager PWA
*/

var cache_version = '1.0';
var cache_name = 'wmp-pwa-' + cache_version;
var files_to_cache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/favicon.ico',
    '/audio/wm-organics-male-en.mp3',
    '/audio/wm-organics-male-en.wav',
    '/audio/wm-organics-male-en.ogg',
    '/audio/wm-organics-female-en.mp3',
    '/audio/wm-organics-female-en.wav',
    '/audio/wm-organics-female-en.ogg',
    '/audio/wm-trash-male-en.mp3',
    '/audio/wm-trash-male-en.wav',
    '/audio/wm-trash-male-en.ogg',
    '/audio/wm-trash-female-en.mp3',
    '/audio/wm-trash-female-en.wav',
    '/audio/wm-trash-female-en.ogg',
    '/images/icon-wmp-128.png',
    '/images/icon-wmp-144.png',
    '/images/icon-wmp-152.png',
    '/images/icon-wmp-192.png',
    '/images/icon-wmp-256.png',
    '/images/icon-wmp-512.png'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(cache_name).then(function(cache){
                    return cache.addAll(files_to_cache);
		}).catch(function(error){
                    console.log('Service Worker Error' + error);
                })
	);
});

self.addEventListener('activate', function(event){
    event.waitUntil(
        // Remove all old cached data from storage.
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key){
                if (key != cache_name){
                    console.log('Service Worker Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(event){
    try{
        event.respondWith(
            caches.open(cache_name).then(function(cache){
                return caches.match(event.request).then(function(response){
                    return response || fetch(event.request).then(function(response){
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
	);
    }catch(error){
        console.log('well, that didnt work:' + error);
    }
});