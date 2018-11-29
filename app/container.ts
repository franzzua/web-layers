import {Container} from "@so/di";
import {RootStore} from "store-rxjs";
import {AppRootStore} from "../framework/app-root-store";
import {FreeStore} from "./stores/free/free.store";
import {AppStore} from "./stores/app/app.store";
import {SlideStore} from "./stores/slide/slide.store";
import {FreeEpic} from "./stores/free/free.epic";
import {Application} from "./application";
import {DomainStore} from "./stores/slide/domain.store";
import {SlideEpic} from "./stores/slide/slide.epic";
// import {IRequestService, Logger} from "@so/utils";
// import {FetchRequestService} from "../framework/fetchRequestService";
import {Router} from "./router";
// import {EmptyLogger} from "./services/empty.logger";
import {Logger} from "@gm/isomorphic-core";
import {EmptyLogger} from "./services/empty.logger";
import {Domain, DomainProviders} from "./domain";


export const AppProviders = [
    {provide: Router},
    {provide: RootStore, useClass: AppRootStore, deps: []},
    {provide: Logger, useClass: EmptyLogger, deps: []},
    {provide: Application, useClass: Application, deps: [RootStore, Container]},
    {provide: FreeStore, deps: [AppStore, SlideStore, FreeEpic]},
    {provide: FreeEpic, deps: [Domain, SlideStore]},
    {provide: SlideStore, deps: [RootStore, DomainStore, Domain, SlideEpic]},
    {provide: SlideEpic, deps: [Domain]},
    {provide: DomainStore, deps: [RootStore, Domain]},
    {provide: AppStore, deps: [RootStore]},
    // {provide: IRequestService, useClass: FetchRequestService, deps: []},
];


export const AppContainer = new Container();

AppContainer.provide([
    // ...DomainInjector.simple('http://localhost/api'),
    // ...WebsocketDomainProviders('ws://iis-dev-ost.mapmak.dom/gm/ws'),
    ...DomainProviders,
    ...AppProviders
]);


