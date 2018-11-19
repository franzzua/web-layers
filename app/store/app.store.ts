import {ObservableStore} from 'store-rxjs/dist';
import {AppRootStore} from "../../framework/app-root-store";
import {AppActions} from "./app.actions";
import {Injectable} from "@decorators/di";
import {filter, map} from "../../rxjs";
import {Fn} from "store-rxjs/dist/Fn";

@Injectable()
export class AppStore extends ObservableStore<any> {
    constructor(root: AppRootStore) {
        super(root, 'app');
    }

    public Actions = new AppActions();

    public IsActive$ = this.asObservable().pipe(
        filter(Fn.Ib),
        map(a => a.active)
    )
}

// Container.provide([{provide: RootStore, useClass: AppRootStore}]);