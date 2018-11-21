import {ObservableStore} from 'store-rxjs';
import {AppRootStore} from "../../framework/app-root-store";
import {AppActions} from "./app.actions";
import {Injectable} from "@decorators/di";
import {filter, map} from "../../rx";

@Injectable()
export class AppStore extends ObservableStore<any> {
    constructor(root: AppRootStore) {
        super(root, 'app');
    }

    public Actions = new AppActions();

    public IsActive$ = this.asObservable().pipe(
        filter(x => !!x),
        map(a => a.active)
    )
}

// Container.provide([{provide: RootStore, useClass: AppRootStore}]);