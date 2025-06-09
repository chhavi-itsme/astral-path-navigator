const CACHE_NAME = 'saturn-return-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';
const IMAGE_CACHE = 'images-v3';

// Static assets to cache immediately with long TTL
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
const apiEndpoints = ['/api'];

// Image domains to cache
const imageDomains = ['images.unsplash.com'];

self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(staticAssets);
      }),
      caches.open(DYNAMIC_CACHE),
      caches.open(IMAGE_CACHE)
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
          if (![STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE].includes(cacheName)) {
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
    // Images - Cache First with long TTL
    if (request.destination === 'image' || imageDomains.some(domain => url.hostname.includes(domain))) {
      event.respondWith(cacheFirstWithLongTTL(request, IMAGE_CACHE, 86400000)); // 24 hours
    }
    // Static assets - Cache First with version checking
    else if (staticAssets.some(asset => url.pathname === asset || url.pathname.endsWith(asset))) {
      event.respondWith(cacheFirstWithFallback(request, STATIC_CACHE));
    }
    // API calls - Network First with short cache
    else if (apiEndpoints.some(endpoint => url.pathname.startsWith(endpoint))) {
      event.respondWith(networkFirstWithTimeout(request, DYNAMIC_CACHE, 3000));
    }
    // Pages - Stale While Revalidate for fast loading
    else if (request.destination === 'document') {
      event.respondWith(staleWhileRevalidateWithPrefetch(request, DYNAMIC_CACHE));
    }
    // Other resources - Network First with fallback
    else {
      event.respondWith(networkFirstWithTimeout(request, DYNAMIC_CACHE, 5000));
    }
  }
});

// Enhanced Cache First Strategy with TTL
async function cacheFirstWithLongTTL(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    const dateHeader = cached.headers.get('date');
    const cachedDate = new Date(dateHeader);
    const now = new Date();
    
    if (now.getTime() - cachedDate.getTime() < maxAge) {
      return cached;
    }
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    if (cached) return cached;
    return new Response('Network error', { status: 503 });
  }
}

// Cache First with Fallback
async function cacheFirstWithFallback(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) return cached;
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Offline', { status: 503 });
  }
}

// Network First with Timeout
async function networkFirstWithTimeout(request, cacheName, timeout) {
  const cache = await caches.open(cacheName);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const networkResponse = await fetch(request, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response('Network timeout', { status: 503 });
  }
}

// Stale While Revalidate with Prefetch
async function staleWhileRevalidateWithPrefetch(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  const networkResponsePromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
      
      // Prefetch related resources
      if (request.url.includes('/calculator')) {
        cache.add('/about');
      }
    }
    return response;
  }).catch(() => cached);
  
  return cached || networkResponsePromise;
}

// Set cache headers for better performance
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          const newHeaders = new Headers(response.headers);
          newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
          });
        }
        return fetch(event.request);
      })
    );
  }
});

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
