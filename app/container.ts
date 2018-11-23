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
import {IRequestService, Logger} from "@gm/isomorphic-core";
import {FetchRequestService} from "../framework/fetchRequestService";
import {GmSlide} from "../ui/gm/gm-slide/gm-slide";
import {AppRoot} from "../ui/root/app-root.component";
import {MapComponent} from "../ui/gm/gm-map/map.component";

export class EmptyLogger extends Logger {
    send() {

    }
}

Container.provide([
    {provide: RootStore, useClass: AppRootStore, deps: []},
    ...DomainInjector.simple('http://localhost/api'),
    {provide: Logger, useClass: EmptyLogger, deps: []},
    {provide: Application, useClass: Application, deps: [RootStore]},
    {provide: FreeStore, deps: [AppStore, SlideStore, FreeEpic]},
    {provide: FreeEpic, deps: [Domain, SlideStore]},
    {provide: SlideStore, deps: [RootStore, DomainStore, Domain, SlideEpic]},
    {provide: SlideEpic, deps: [Domain]},
    {provide: DomainStore, deps: [RootStore, Domain]},
    {provide: AppStore, deps: [RootStore]},
    {provide: FreeLayout, multiple: true, deps: [Domain, FreeStore, SlideStore]},
    {provide: FreeSettings, multiple: true, deps: [FreeStore]},
    {provide: GmSlide, multiple: true, deps: [Domain]},
    {provide: MapComponent, multiple: true, deps: [SlideStore]},
    {provide: AppRoot, multiple: true, deps: []},
    {provide: IRequestService, useClass: FetchRequestService, deps: []}
]);

export const AppContainer = Container;