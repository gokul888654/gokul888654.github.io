'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "cef3c468342ff62a7165d7211c6bb8b1",
"assets/assets/demo/back1.jpg": "a1a9c5a09346a56947ff1cf3094578e8",
"assets/assets/demo/back10.jpg": "e88ebab0ac38c5dd7bb1cff11ad77cfb",
"assets/assets/demo/back2.jpg": "747fa46304d00400e15ed449963ed4be",
"assets/assets/demo/back2.png": "bfaa0e5d83a1d625a3387ef928161c77",
"assets/assets/demo/back3.jpg": "e56c4ffa74a2408043cd8dc0b63e1823",
"assets/assets/demo/back4.jpg": "4e8f510739d63fbae6de95fc2cb2c7ea",
"assets/assets/demo/back5.jpg": "dcffacf0a799eefa688c3b544c558872",
"assets/assets/demo/back6.jpg": "aa3d9031b89a2409bae3e80d1348fb48",
"assets/assets/demo/back7.jpg": "be92721c03667579a6d05e178019576a",
"assets/assets/demo/back8.jpg": "c360992dc0643d0a487ce877823605aa",
"assets/assets/demo/back9.jpg": "5d537c6389ed42bb9ce190d02db51b61",
"assets/assets/demo/biryani.png": "4a3ab4cec7571ef29f01fc14bcb20c18",
"assets/assets/demo/chicken-leg.png": "a3bbc96a3c82b4c41f3a7b7ea83a13f1",
"assets/assets/demo/curry.png": "b4a220f53781e3b30646e15beba60604",
"assets/assets/demo/diet.png": "c1a35f61a8bbbc989625433174446223",
"assets/assets/demo/fast-food%2520(1).png": "4ddffaf7b98ff14c06bb82860a98242f",
"assets/assets/demo/fast-food%2520(4).png": "5792cf0025e87e011e2664a9863aa1fe",
"assets/assets/demo/fast-food%2520(5).png": "e86dbf7c9d7048945057725c25b50b4a",
"assets/assets/demo/fast-food.png": "27fcb554c21206d4c5f3cf9ba903419f",
"assets/assets/demo/fast-foods.png": "5728be797d5285e1a4e40cb0ed4e96a1",
"assets/assets/demo/filter.png": "bfaa0e5d83a1d625a3387ef928161c77",
"assets/assets/demo/food-delivery.png": "1a8814254e6b4fa07acde2c7e4ffef47",
"assets/assets/demo/food.png": "8a67bd8402c159d21d80d5dbb47c9fe8",
"assets/assets/demo/hamburger.png": "fdb953e747052b088eda7e2d8bc116b9",
"assets/assets/demo/laddu.png": "db9876bcee31cfc9b5c35d095622ca5f",
"assets/assets/demo/pizza.png": "7181a339f00639156714202aeea1ac1d",
"assets/assets/demo/samosa.png": "4be6f8a5bc332090cf8cfa023d5b652d",
"assets/assets/demo/search.png": "a5236f889c2a890dfbafef9ffe87c8cf",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "2ceedb153a9ddf191c47e7cb8b46fda6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "cfb824b0dd7f92ecab7cbd0e01e7a994",
"/": "cfb824b0dd7f92ecab7cbd0e01e7a994",
"main.dart.js": "2883c43da7b365c19c5e4a9118a2168e",
"manifest.json": "f596b2825adc5d09a30b5a1fa23ee7d8",
"version.json": "198e037cebd8d39592b5c0cb4fb4e7b0"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
