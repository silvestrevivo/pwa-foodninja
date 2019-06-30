// Variable which works as cache fot the application
const staticCacheName = 'site-static-v1';

// Assets to collect in the cache
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// After registered, we have to install service worker
// This is the first step in the LifeCicle
// Any time this file changes, it gets installed again
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

//Activate service worker
self.addEventListener('activate', (evt) => {
  // console.log('serviceWorker activated')
  evt.waitUntil(
    caches.keys().then(keys => {
      // We manage the cache versions
      return Promise.all(keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
        )
    })
  )
});

// fetch event, to fetch information from the project files
// (api, images, general info from server, etc...)
self.addEventListener('fetch', (evt) => {
  // console.log('fetch event', evt)
  evt.respondWith(
    // eacht time we make a fecht, we check the cache
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  )
});
//* this is necessary to install a banner in the mobile device
