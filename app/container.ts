import {Container} from "@so/di";
import {RootStore} from "store-rxjs";
import {AppRootStore} from "../framework/app-root-store";
import {FreeStore} from "./stores/free/free.store";
import {AppStore} from "./stores/app/app.store";
import {SlideStore} from "./stores/slide/slide.store";
import {FreeEpic} from "./stores/free/free.epic";
import {Application} from "./application";
import {Domain, DomainInjector} from "@gm/isomorphic-domain";
import {DomainStore} from "./stores/slide/domain.store";
import {SlideEpic} from "./stores/slide/slide.epic";
import {IRequestService, Logger} from "@gm/isomorphic-core";
import {FetchRequestService} from "../framework/fetchRequestService";
import {RouterStore} from "./stores/router/router.store";
import {EmptyLogger} from "./services/empty.logger";

export const AppProviders = [
    {provide: RouterStore},
    {provide: RootStore, useClass: AppRootStore, deps: []},
    {provide: Logger, useClass: EmptyLogger, deps: []},
    {provide: Application, useClass: Application, deps: [RootStore, Container]},
    {provide: FreeStore, deps: [AppStore, SlideStore, FreeEpic]},
    {provide: FreeEpic, deps: [Domain, SlideStore]},
    {provide: SlideStore, deps: [RootStore, DomainStore, Domain, SlideEpic]},
    {provide: SlideEpic, deps: [Domain]},
    {provide: DomainStore, deps: [RootStore, Domain]},
    {provide: AppStore, deps: [RootStore]},
    {provide: IRequestService, useClass: FetchRequestService, deps: []},
];


export const AppContainer = new Container();

AppContainer.provide([
    ...DomainInjector.simple('http://localhost/api'),
    // ...DomainInjector.websocket('http://localhost/api', 'ws://iis-dev-ost/gm/ws'),
    ...AppProviders
]);


