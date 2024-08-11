const CACHE_NAME = "v1";

self.addEventListener("install", (event) => {
    event.waitUntil(precache());
  });
function precache() {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll([
      "/",
      "/index.html",
      "/index.json",
      "/404.html",
      "/img/CookyBookyLogoV1_Plate.svg",
      "/alphabetic/index.html",
      "/category/index.html",
      "/cs/style.min.css",
      "/cs/fonts/bootstrap-icons.woff",
      "/cs/fonts/bootstrap-icons.woff2",
      "/fonts/AmaticSC-Bold.woff",
      "/fonts/AmaticSC-Bold.woff2",
      "/fonts/AmaticSC-Regular.woff",
      "/fonts/AmaticSC-Regular.woff2",
      "/fonts/SourceSans3[wght].woff",
      "/fonts/SourceSans3[wght].woff2",
      "/js/bundle.min.js",
      "/js/fuse.js",
      "/js/search.js",
      {{ range $i, $e := .Site.RegularPages -}}
      "{{ .RelPermalink }}"{{ if lt (add $i 1) .Site.RegularPages.Len }}, {{ end }}
      {{ end }}
    ]);
  });
}
const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
