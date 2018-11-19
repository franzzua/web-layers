import {component, Component, IEventHandler} from "../framework/component";
import {AppStore} from "../app/store/app.store";
import {combineLatest, filter, interval, map, startWith, tap} from "../rxjs";

@component({
    name: 'simple-div',
    observedAttributes: ['name'],
    booleanAttributes: ['active'],
})
export class SimpleElement extends Component<IState, IEvents> {

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

    public Render(html, state: IState, events: IEventHandler<IEvents>) {
        return html`
            <div>Hello ${state.name} is ${state.active}</div>
            <input type="checkbox" 
                   checked="${state.active ? 'checked' : ''}" 
                   onchange="${events.active}">
        `;
    }

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