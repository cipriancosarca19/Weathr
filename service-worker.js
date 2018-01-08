"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/Weathr/index.html","31a12cc1060bb52a915d468cef3f2b79"],["/Weathr/static/css/main.4daefbf8.css","2a2f7834633a7a86a2c6d8c10d275de9"],["/Weathr/static/js/main.841dfb91.js","00953270537586e769fa767fa03714ff"],["/Weathr/static/media/clear-day.53f709c5.svg","53f709c56c0cb268362ba119c34e072a"],["/Weathr/static/media/clear-night.b87ca8b6.svg","b87ca8b626b1d792e4b35da43f795ba7"],["/Weathr/static/media/cloudy.79b3c647.svg","79b3c647bcb4502fe1f95e9d9c5de5d9"],["/Weathr/static/media/fog.3694ef67.svg","3694ef67610075498c91cdb7b2bfb2f4"],["/Weathr/static/media/hail.79b3c647.svg","79b3c647bcb4502fe1f95e9d9c5de5d9"],["/Weathr/static/media/partly-cloudy-day.534afba6.svg","534afba6dc879efc03f27d5c964416bf"],["/Weathr/static/media/partly-cloudy-night.675a7cdd.svg","675a7cddcf441a98bad0880208ecdb37"],["/Weathr/static/media/rain.316ec331.svg","316ec3310f84545f10f9525b44509d10"],["/Weathr/static/media/snow.20379c89.svg","20379c89e064dca7173f49395ec16223"],["/Weathr/static/media/thunderstorm.1afe7efd.svg","1afe7efda2ae788f15823e0f19d4a140"],["/Weathr/static/media/tornado.b6e81ba5.svg","b6e81ba5cf340047ac2d230b394e613d"],["/Weathr/static/media/weathr_sun.21174bda.svg","21174bdaa553fcd20aaf9df229ac3563"],["/Weathr/static/media/weathr_text.b3d51d14.svg","b3d51d143631257dd39d0669193ab58e"],["/Weathr/static/media/wind.6b4d1006.svg","6b4d10062fb150d93eb6d0a550d19947"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],r=new URL(t,self.location),n=createCacheKey(r,hashParamName,a,/\.\w{8}\./);return[r.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var r=new Request(a,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/Weathr/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});