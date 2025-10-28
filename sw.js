// ============================================
// UIENC 2.0 Service Worker - PWA Support
// Offline Capability & Caching Strategy
// ============================================

const CACHE_NAME = 'uienc-v1.0.0';
const OFFLINE_CACHE = 'uienc-offline-v1';

// Files to cache for offline use
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/mentor-dashboard.html',
  '/parent-dashboard.html',
  '/css/uienc-dashboard.css',
  '/css/mentor-dashboard.css',
  '/css/parent-dashboard.css',
  '/js/uienc-dashboard.js',
  '/js/mentor-dashboard.js',
  '/js/parent-dashboard.js',
  '/js/i18n.js',
  '/manifest.json',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png',
  '/offline.html'
];

// CDN resources to cache
const CDN_CACHE = [
  'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching app shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        return caches.open(OFFLINE_CACHE);
      })
      .then((cache) => {
        console.log('📦 Service Worker: Caching CDN resources');
        return cache.addAll(CDN_CACHE);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE) {
              console.log('🗑️ Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.includes('unpkg.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('📂 Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If both cache and network fail, show offline page
            console.log('📴 Service Worker: Offline mode');
            return caches.match('/offline.html');
          });
      })
  );
});

// Background sync for data
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Background sync triggered');
  
  if (event.tag === 'sync-learner-data') {
    event.waitUntil(syncLearnerData());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('🔔 Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/assets/icon-192x192.png',
    badge: '/assets/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/assets/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('UIENC Dashboard', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler for communication with main app
self.addEventListener('message', (event) => {
  console.log('💬 Service Worker: Message received', event.data);
  
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.action === 'clearCache') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// Helper function for background sync
async function syncLearnerData() {
  try {
    // Get pending data from IndexedDB
    const pendingData = await getPendingData();
    
    if (pendingData.length > 0) {
      // Send to server
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pendingData)
      });
      
      if (response.ok) {
        console.log('✅ Service Worker: Data synced successfully');
        await clearPendingData();
      }
    }
  } catch (error) {
    console.error('❌ Service Worker: Sync failed', error);
  }
}

// IndexedDB helper functions
async function getPendingData() {
  return new Promise((resolve) => {
    const request = indexedDB.open('uienc-sync', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['pending'], 'readonly');
      const store = transaction.objectStore('pending');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };
    };
    
    request.onerror = () => {
      resolve([]);
    };
  });
}

async function clearPendingData() {
  return new Promise((resolve) => {
    const request = indexedDB.open('uienc-sync', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['pending'], 'readwrite');
      const store = transaction.objectStore('pending');
      store.clear();
      resolve();
    };
  });
}

console.log('📱 UIENC Service Worker: Loaded and ready!');

