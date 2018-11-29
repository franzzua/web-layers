import {ReplaySubject} from "rxjs";
import {filter, map, shareReplay, tap} from "rxjs/operators";
import {IRequestService} from "@gm/isomorphic-core";
import {Container} from "@so/di";
import {FetchRequestService} from "../framework/fetchRequestService";
import {DomainProviders, DomainEpic} from "./domain";


const container = new Container();
container.provide(DomainProviders);
container.provide([
    {provide: IRequestService, useClass: FetchRequestService, deps: []}
]);

export class DomainWebWorkerService {

    private InputSubject$ = new ReplaySubject<{ type?; }>();
    private Input$ = this.InputSubject$.asObservable().pipe(
        filter(d => d.type),
        shareReplay(1)
    );

    private domainEpic = container.get<DomainEpic>(DomainEpic);

    public Output$ = this.domainEpic.epic$(this.Input$).pipe(
        shareReplay(1)
    );

    constructor() {
    }

    public onMessage = (e: MessageEvent) => {
        this.InputSubject$.next(e.data);
    }

}
