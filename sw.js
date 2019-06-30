// Variable which works as cache fot the application
const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

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
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/pages/fallback.html'
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};


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
        // checking what page we have to catch
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event, to fetch information from the project files
// (api, images, general info from server, etc...)
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt)

  // we need to see if caching is necessary because FireStore
  if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          // we manage the dynamic cache here
          // that means we can add dynamically new urls visited
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            //limiting the size of cache
            limitCacheSize(dynamicCacheName, 15);// 15 is the max size we choose
            return fetchRes;
          })
        });
        // adding fallback page
      }).catch(() => {
        if(evt.request.url.indexOf('.html') > -1){
          return caches.match('/pages/fallback.html');
        }
      })
    );
  }
});
//* this is necessary to install a banner in the mobile device
