import {ObservableStore, RootStore} from 'store-rxjs';
import {AppActionsCreator} from "./app-actions.creator";
import {Injectable} from "@so/di";
import {AppReducer} from "./app.reducer";
import {filter} from "rx";

@Injectable()
export class AppStore extends ObservableStore<any> {
    constructor(root: RootStore) {
        super(root, 'app');
    }

    public Actions = new AppActionsCreator();

    public State$ = this.asObservable().pipe(
        filter(x => !!x),
    );

    public Init() {
        super.Init({active: false, items: [1, 2, 3]})
    }

    protected reducer = new AppReducer();
}

// Container.provide([{provide: RootStore, useClass: AppRootStore}]);