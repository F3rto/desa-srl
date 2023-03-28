self.addEventListener('install', (event) => {
    //console.log('Service worker installed');
  });
  
  self.addEventListener('activate', (event) => {
    //console.log('Service worker activated');
  });
  
  self.addEventListener('fetch', (event) => {
    //console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });
  