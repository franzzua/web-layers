import {Component, HyperComponent} from "@so/ui";
import {AppStore} from "../../app/store/app.store";
import {combineLatest, filter, map, tap, merge} from "../../rx";

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

    public State$ = combineLatest(this.Name$, this.appStore.State$).pipe(
        map(([name, state]) => ({
            name, ...state
        })),
    );

    private Actions = {
        active: this.Events$.pipe(
            filter(e => e.type === 'active'),
            tap(a => this.appStore.Actions.ChangeActive(a.event.target['checked'])),
        ),
        remove: this.Events$.pipe(
            filter(e => e.type === 'increment'),
            tap(a => this.appStore.Actions.IncrementItem(a.event)),
        ),
    };

    public Actions$ = merge(
        this.Actions.active,
        this.Actions.remove
    )
}

export interface IEvents {
    active;
    increment;
}

export interface IState {
    active: boolean;
    name: string;
    items: string[];
}