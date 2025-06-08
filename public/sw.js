const CACHE_NAME = 'saturn-return-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';

// Static assets to cache immediately
const staticAssets = [
  '/',
  '/calculator',
  '/about',
  '/blog',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/favicon.ico',
  '/favicon.svg'
];

// API endpoints to cache with network-first strategy
const apiEndpoints = [
  '/api'
];

self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(staticAssets);
      }),
      caches.open(DYNAMIC_CACHE)
    ]).then(() => {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests with different strategies
  if (request.method === 'GET') {
    // Static assets - Cache First
    if (staticAssets.some(asset => url.pathname === asset || url.pathname.endsWith(asset))) {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
    }
    // Images - Cache First with fallback
    else if (request.destination === 'image') {
      event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    }
    // API calls - Network First
    else if (apiEndpoints.some(endpoint => url.pathname.startsWith(endpoint))) {
      event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    }
    // Pages - Stale While Revalidate
    else if (request.destination === 'document') {
      event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    }
    // Other resources - Network First
    else {
      event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    }
  }
});

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, no cache available');
    return new Response('Network error', { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    return new Response('Network error', { status: 503 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  const networkResponsePromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);
  
  return cached || networkResponsePromise;
}

// Background sync for failed requests
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any queued requests when connection is restored
  console.log('Background sync triggered');
}
