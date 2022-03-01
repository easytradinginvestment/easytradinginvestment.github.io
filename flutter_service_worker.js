'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "91cae15e5888eab2ed6ef49c93065743",
"assets/assets/icons/bonus.svg": "5d37487c0d6694dac0fde8c73cdd9c33",
"assets/assets/icons/Easy%2520Trading%2520Investment.png": "1ae333a0d57c634642675ee5218d7251",
"assets/assets/icons/investment.svg": "74cd90135367c96eec3a03b9feaa463a",
"assets/assets/icons/menu_dashbord.svg": "b2cdf62e9ce9ca35f3fc72f1c1fcc7d4",
"assets/assets/icons/menu_notification.svg": "460268d6e4bdeab56538d7020cc4b326",
"assets/assets/icons/menu_profile.svg": "fe56f998a7c1b307809ea3653a1b62f9",
"assets/assets/icons/menu_setting.svg": "d0e24d5d0956729e0e2ab09cb4327e32",
"assets/assets/icons/menu_tran.svg": "6c95fa7ae6679737dc57efd2ccbb0e57",
"assets/assets/icons/pending.svg": "8eebaf40d3292ca1f8818e4d2d1a6f29",
"assets/assets/icons/totalearnings.svg": "bbe9ed3bfd714689b5d2c66de4cf6385",
"assets/assets/icons/unknown.svg": "b2f3cdc507252d75dea079282f14614f",
"assets/assets/images/analytics.jpg": "79dffa2044a114d2cb19b2c0239350f7",
"assets/assets/images/benefits.jpg": "88b56c86cfe37b8acc42c12e068a6892",
"assets/assets/images/binary.jpg": "7574bcf1a5d340670b50138bde3d4e19",
"assets/assets/images/bitcoin.jpg": "41a433ff5ca4c179cd38af0c472a5028",
"assets/assets/images/bitcoin2.jpg": "4d0eb931612b5a15b60fd862fba5da5c",
"assets/assets/images/bitcoin3.jpg": "077e6b0c78fb1ae3c36b9c8c16281ed5",
"assets/assets/images/cover.jpg": "7e30bbdcdcd8626f174e5bc6bc9e22ad",
"assets/assets/images/error.png": "34a3c86257800bf5e90595c112370b19",
"assets/assets/images/google_logo.png": "b75aecaf9e70a9b1760497e33bcd6db1",
"assets/assets/images/howitworks.jpg": "66aaa1ea269634739a74f2ff631e9274",
"assets/assets/images/investment.jpg": "dc5b8d869b4a8e8c0e571a2fbe235644",
"assets/assets/images/loan.jpg": "945a80d930d520f166d0271ff197bd02",
"assets/assets/images/new.jpg": "b5d45218a87480113c590fdf0ae4a8d1",
"assets/assets/images/new1.jpg": "037b2748e31aa2fdb0520f2f3e68f8d3",
"assets/assets/images/new2.jpg": "af8debf8ffb28981edb3939a24321592",
"assets/assets/images/packages.jpg": "a21621a7bf60b37df301598e6c4f0aec",
"assets/assets/images/R.jpg": "1e93613a3dfa0d083cea17e598c98fb8",
"assets/assets/images/stock-trading.jpg": "7c7c092a4c9a938d2c3f0acb66c8b5c4",
"assets/assets/images/stock.jpg": "1c7ea59b73e78b8e8b32ed40864a0b53",
"assets/assets/images/trade.jpg": "7c11c46348b34543203f8073587fa47a",
"assets/assets/images/trading.jpg": "561a0e59a8555620661ef3132d97938d",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "d244eae2a5557052763951851f4d26f9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "05d181108b3504e2045f7980507f2f10",
"icons/android-chrome-192x192.png": "97f1c9e01a975b411bba20ac8ac41b5f",
"icons/android-chrome-512x512.png": "47c59f2fd57d68db3417873a0ab78eff",
"icons/apple-touch-icon.png": "ed8139e112080badb273eab0b09087e5",
"index.html": "f622506093096a20d2d8c2f9ba09b563",
"/": "f622506093096a20d2d8c2f9ba09b563",
"main.dart.js": "0050e3af78e41311f1f72109e259b521",
"manifest.json": "5a06c064adeb02d34f39115b7a473373",
"version.json": "9094aacdae789dccd67fa32109ff1a18"
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
