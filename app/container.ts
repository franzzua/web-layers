import {RootStore} from "store-rxjs";
import {AppRootStore} from "../framework/app-root-store";
import {FreeStore} from "./free/free.store";
import {AppStore} from "./store/app.store";
import {SlideStore} from "./slide/slide.store";
import {FreeEpic} from "./free/free.epic";
import {Application} from "./application";
import {Container} from "../framework/di";
import {FreeLayout} from "../ui/gm/free-layout/free-layout";
import {FreeSettings} from "../ui/gm/free-settings/free-settings";
import {Domain, DomainInjector} from "@gm/isomorphic-domain";
import {DomainStore} from "./slide/domain.store";
import {SlideEpic} from "./slide/slide.epic";
import {IRequestService} from "@gm/isomorphic-core";
import {FetchRequestService} from "../framework/fetchRequestService";

Container.provide([
    {provide: RootStore, useClass: AppRootStore, deps: []},
    ...DomainInjector.simple('/api'),
    {provide: Application, useClass: Application, deps: [RootStore]},
    {provide: FreeStore, deps: [AppStore, SlideStore, FreeEpic]},
    {provide: FreeEpic, deps: [Domain, SlideStore]},
    {provide: SlideStore, deps: [RootStore, DomainStore, Domain, SlideEpic]},
    {provide: SlideEpic, deps: [Domain]},
    {provide: DomainStore, deps: [RootStore, Domain]},
    {provide: AppStore, deps: [RootStore]},
    {provide: FreeLayout, multiple: true, deps: []},
    {provide: FreeSettings, multiple: true, deps: [FreeStore]},
    {provide: IRequestService, useClass: FetchRequestService, deps: []}
]);

export const AppContainer = Container;