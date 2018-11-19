import HyperHTMLElement from "hyperhtml-element";
import {scan, startWith, tap, Observable, ReplaySubject, Subject} from "../rxjs";
import {Container, Injectable} from "@decorators/di";
import {Reflector} from "@decorators/di/src/reflector";

export function component(info: {
    name: string,
    observedAttributes?: string[],
    booleanAttributes?: string[],
}, options?: ElementDefinitionOptions) {
    return (target) => {
        let Id = 0;
        const elementConstructor = class extends HyperHTMLElement {
            static observedAttributes = info.observedAttributes || [];
            static booleanAttributes = info.booleanAttributes || [];
            private component: ComponentExtended<any>;
            private _id = Id++;

            created() {
                const dependencies = Reflector.paramTypes(target).map(type => Container.get(type));
                this.component = new target(...dependencies);
                this.component['id'] = this._id;
                const handlerProxy = new Proxy({}, {
                    get: (target, key) => this.dispatchEvents(key)
                });
                console.log(handlerProxy['active']);
                this.component.State$.subscribe(state => {
                    this.component.Render(this.html.bind(this), state, handlerProxy);
                });
                this.component.Actions$.subscribe();
                this.component.created();
            }

            dispatchEvents = type => (event: Event) => this.component._eventsSubject$.next({
                event: event,
                type: type
            });

            attributeChangedCallback(name: string, prev: string, curr: string) {
                this.component._attributesSubject$.next({name, value: curr});
            }
        };
        elementConstructor.define(info.name, options);
    }
}

interface ComponentExtended<TState> {
    _attributesSubject$: Subject<{ name, value }>;
    _eventsSubject$: Subject<{ event: Event; type: string }>;

    State$: Observable<TState>;
    Actions$: Observable<{ type: string; payload?: any }>;

    Render(html, state: TState, events);

    created();
}

export type IEventHandler<TEvents> = {
    [K in keyof TEvents]: (Event) => void
};

export abstract class Component<TState, TEvents> {

    abstract State$: Observable<TState>;
    abstract Actions$: Observable<{ type: string; payload?: any }>;

    abstract Render(html, state: TState, events: IEventHandler<TEvents>);

    created() {

    }

    private _attributesSubject$ = new ReplaySubject<{ name, value }>();
    private _eventsSubject$ = new ReplaySubject<{ event: Event; type: keyof TEvents; }>();
    protected Events$ = this._eventsSubject$.asObservable();
    protected Attributes$ = this._attributesSubject$.asObservable().pipe(
        scan<{ name, value }, any>((acc, val) => ({...acc, [val.name]: val.value}), {}),
        startWith({}),
        tap(console.log),
    );
}
