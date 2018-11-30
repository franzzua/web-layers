import {WebsocketDomainProviders, Domain as WsDomain} from "@gm/isomorphic-domain/dist/websocket";
// import {WebsocketDomainProviders as WebworkerDomainProviders, Domain as WwDomain} from "@gm/isomorphic-domain/dist/webworker";
// import {BrowserDomainProviders, Domain as BrowserDomain} from "@gm/isomorphic-domain/dist/browser";
import {Provider} from "@so/di";
import {IRequestService} from "@gm/isomorphic-core";
import {FetchRequestService} from "../framework/fetchRequestService";

const wsUrl = `${location.protocol.replace('http','ws')}//${location.hostname}/gm/ws`;
const WsDomainProviders: Provider[] = WebsocketDomainProviders(wsUrl);
// const WwDomainProviders: Provider[] = [
//     ...WebworkerDomainProviders('./worker.js'),
//     {provide: IRequestService, useClass: FetchRequestService, deps: []}
// ];

// const BsDomainProviders: Provider[] = [
//     ...BrowserDomainProviders('http://localhost/api'),
//     {provide: IRequestService, useClass: FetchRequestService, deps: []}
// ];

// export {
//     BrowserDomain as Domain,
//     BsDomainProviders as DomainProviders
// };

export {
    WsDomain as Domain,
    WsDomainProviders as DomainProviders
};
// export {
//     WwDomain as Domain,
//     WwDomainProviders as DomainProviders
// };