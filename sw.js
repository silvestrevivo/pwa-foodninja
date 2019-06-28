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

// fetch event, to fetch information from the project files
// (api, images, general info from server, etc...)
self.addEventListener('fetch', (evt) => {
  console.log('fetch event', evt)
})
//* this is necessary to install a banner in the mobile device
