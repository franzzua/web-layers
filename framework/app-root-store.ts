import {Inject, Injectable} from "@decorators/di";
import {DevToolEnhancer, Store, RootStore} from "store-rxjs";
import {StoreEnhancer} from "redux";
import {EmptyInjector} from "./empty-injector";

const reduxDevToolsExtension = require('redux-devtools-extension');

class DevToolEnhancerRedux extends DevToolEnhancer {
    public Enhance(storeEnhancer: StoreEnhancer<{}, {}>) {
        return reduxDevToolsExtension.composeWithDevTools(storeEnhancer);
    }
}

@Injectable()
export class AppRootStore extends RootStore {
    constructor(@Inject(EmptyInjector) a: any, @Inject(EmptyInjector) b: any) {
        super(new Store(), new DevToolEnhancerRedux());
    }

}