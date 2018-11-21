import {Component, HyperComponent} from "../../framework/component";
import {AppStore} from "../../app/store/app.store";
import {combineLatest, filter, map, tap} from "../../rx";

@Component({
    name: 'simple-div',
    observedAttributes: ['name'],
    booleanAttributes: ['active'],
    template: require("./simple-element.tsx"),
    style: require('./simple-element.less')
})
export class SimpleElement extends HyperComponent<IState, IEvents> {

    constructor(private appStore: AppStore) {
        super();
    }

    private Name$ = this.Attributes$.pipe(
        map(a => a.name as string)
    );

    public State$ = combineLatest(this.Name$, this.appStore.IsActive$).pipe(
        map(([name, isActive]) => ({
            name, active: isActive
        })),
    );

    public Actions$ = this.Events$.pipe(
        filter(e => e.type === 'active'),
        tap(console.log),
        tap(a => this.appStore.Actions.ChangeActive(a.event.target.checked)),
    );
}

export interface IEvents {
    active;
}

export interface IState {
    active: boolean;
    name: string;
}