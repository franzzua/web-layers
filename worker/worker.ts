// worker
import {DomainWebWorkerService} from "./domain-web-worker.service";

const service = new DomainWebWorkerService();

self.onmessage = service.onMessage;

const postMessages = [];
if (self.postMessage) {
    postMessages.push(self.postMessage.bind(self));
}else{
    self.postMessage = function () {}
}

// shared worker
self['onconnect'] = function (e) {
    const port = e.ports[0];
    port.addEventListener('message', service.onMessage);
    // postMessages.push(port.postMessage.bind(port));
    service.Output$.subscribe(d => {
        port.postMessage(d);
    });
    port.start();
};
//
// service.Output$.subscribe(d => {
//     postMessages.forEach(f => f(d));
// });

self.addEventListener('install', () => {
  self.addEventListener('message', service.onMessage);
});

self.addEventListener('connect', console.log);
