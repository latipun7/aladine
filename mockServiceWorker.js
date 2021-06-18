const INTEGRITY_CHECKSUM="82ef9b96d8393b6da34527d1d6e19187",bypassHeaderName="x-msw-bypass",activeClientIds=new Set;async function resolveMasterClient(e){const t=await self.clients.get(e.clientId);return"top-level"===t.frameType?t:(await self.clients.matchAll()).filter((e=>"visible"===e.visibilityState)).find((e=>activeClientIds.has(e.id)))}async function handleRequest(e,t){const s=await resolveMasterClient(e),r=await getResponse(e,s,t);return s&&activeClientIds.has(s.id)&&async function(){const e=r.clone();sendToClient(s,{type:"RESPONSE",payload:{requestId:t,type:e.type,ok:e.ok,status:e.status,statusText:e.statusText,body:null===e.body?null:await e.text(),headers:serializeHeaders(e.headers),redirected:e.redirected}})}(),r}async function getResponse(e,t,s){const{request:r}=e,n=r.clone(),a=()=>fetch(n);if(!t)return a();if(!activeClientIds.has(t.id))return await a();if("true"===n.headers.get("x-msw-bypass")){const e=serializeHeaders(n.headers);delete e["x-msw-bypass"];const t=new Request(n,{headers:new Headers(e)});return fetch(t)}const i=serializeHeaders(r.headers),o=await r.text(),d=await sendToClient(t,{type:"REQUEST",payload:{id:s,url:r.url,method:r.method,headers:i,cache:r.cache,mode:r.mode,credentials:r.credentials,destination:r.destination,integrity:r.integrity,redirect:r.redirect,referrer:r.referrer,referrerPolicy:r.referrerPolicy,body:o,bodyUsed:r.bodyUsed,keepalive:r.keepalive}});switch(d.type){case"MOCK_SUCCESS":return delayPromise((()=>respondWithMock(d)),d.payload.delay);case"MOCK_NOT_FOUND":return a();case"NETWORK_ERROR":{const{name:e,message:t}=d.payload,s=new Error(t);throw s.name=e,s}case"INTERNAL_ERROR":{const e=JSON.parse(d.payload.body);return console.error(`[MSW] Request handler function for "%s %s" has thrown the following exception:\n\n${e.errorType}: ${e.message}\n(see more detailed error stack trace in the mocked response body)\n\nThis exception has been gracefully handled as a 500 response, however, it's strongly recommended to resolve this error.\nIf you wish to mock an error response, please refer to this guide: https://mswjs.io/docs/recipes/mocking-error-responses`,r.method,r.url),respondWithMock(d)}}return a()}function serializeHeaders(e){const t={};return e.forEach(((e,s)=>{t[s]=t[s]?[].concat(t[s]).concat(e):e})),t}function sendToClient(e,t){return new Promise(((s,r)=>{const n=new MessageChannel;n.port1.onmessage=e=>{if(e.data&&e.data.error)return r(e.data.error);s(e.data)},e.postMessage(JSON.stringify(t),[n.port2])}))}function delayPromise(e,t){return new Promise((s=>{setTimeout((()=>s(e())),t)}))}function respondWithMock(e){return new Response(e.payload.body,{...e.payload,headers:e.payload.headers})}function uuidv4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}self.addEventListener("install",(function(){return self.skipWaiting()})),self.addEventListener("activate",(async function(e){return self.clients.claim()})),self.addEventListener("message",(async function(e){const t=e.source.id;if(!t||!self.clients)return;const s=await self.clients.get(t);if(!s)return;const r=await self.clients.matchAll();switch(e.data){case"KEEPALIVE_REQUEST":sendToClient(s,{type:"KEEPALIVE_RESPONSE"});break;case"INTEGRITY_CHECK_REQUEST":sendToClient(s,{type:"INTEGRITY_CHECK_RESPONSE",payload:INTEGRITY_CHECKSUM});break;case"MOCK_ACTIVATE":activeClientIds.add(t),sendToClient(s,{type:"MOCKING_ENABLED",payload:!0});break;case"MOCK_DEACTIVATE":activeClientIds.delete(t);break;case"CLIENT_CLOSED":activeClientIds.delete(t),0===r.filter((e=>e.id!==t)).length&&self.registration.unregister()}})),self.addEventListener("fetch",(function(e){const{request:t}=e;if("navigate"===t.mode)return;if("only-if-cached"===t.cache&&"same-origin"!==t.mode)return;if(0===activeClientIds.size)return;const s=uuidv4();return e.respondWith(handleRequest(e,s).catch((e=>{console.error('[MSW] Failed to mock a "%s" request to "%s": %s',t.method,t.url,e)})))}));