import {BrowserDomainProviders, Domain as BrowserDomain, DomainEpic} from "@gm/isomorphic-domain/dist/browser";
import {Provider} from "@so/di";
import {IRequestService} from "@gm/isomorphic-core";
import {FetchRequestService} from "../framework/fetchRequestService";

const BsDomainProviders: Provider[] = [
    ...BrowserDomainProviders('http://localhost/api'),
    {provide: IRequestService, useClass: FetchRequestService, deps: []}
];

console.log(BrowserDomain);

export {
    BrowserDomain as Domain,
    BsDomainProviders as DomainProviders,
    DomainEpic
};
//