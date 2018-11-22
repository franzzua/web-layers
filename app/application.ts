import {Container, Inject, Injectable, InjectionToken} from "di";
import {AppRootStore} from "../framework/app-root-store";
import {RootStore} from "store-rxjs";
import {DomainInjector, Domain} from "@gm/isomorphic-domain"
import {EmptyInjector} from "../framework/empty-injector";


@Injectable()
export class Application {
    constructor(root: RootStore) {
        root.createStore();
    }

    Start(){
    }

    Stop(){

    }
}

Container.provide([
    {provide: RootStore, useClass: AppRootStore, deps: []},
    ...DomainInjector.simple('/api').map(p => {
        if ('useClass' in p || 'useValue' in p)
            return p;
        p['useClass'] = p.provide;
        return p;
    }),
    {provide: Application, useClass: Application, deps: [RootStore]},
    {provide: EmptyInjector, useValue: 'asdfasdf', deps: []}
]);

