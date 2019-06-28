//After registered, we have to install service worker
// This is the first step in the LifeCicle
// Any time this file changes, it gets installed again
self.addEventListener('install', (evt) => {
  console.log('service worker has been installed')
})

//Activate service worker
self.addEventListener('activate', (evt) => {
  console.log('serviceWorker activated')
})
