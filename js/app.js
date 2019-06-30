//First, we have to check if the browser support service workers
if('serviceWorker' in navigator){
  //if exists, we register it with a promise
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('serviceWorker registered', reg))
    .catch((err) => console.log('serviceWorker no registered', err))
}
