import HyperHTMLElement from "hyperhtml-element";
import {scan, startWith, tap, Observable, ReplaySubject, Subject, NEVER, of} from "../rx";
import {Container} from "@decorators/di";

export function Component(info: {
    name: string,
    observedAttributes?: string[],
    booleanAttributes?: string[],
    template: Function,
    style: Function
}, options?: ElementDefinitionOptions) {
    // console.log(info.style);
    return (target) => {
        let Id = 0;
        let defined = false;
        const elementConstructor = class extends HyperHTMLElement {
            static observedAttributes = info.observedAttributes || [];
            static booleanAttributes = info.booleanAttributes || [];
            private component: ComponentExtended<any>;
            private _id = Id++;
            handlerProxy: any;

            renderState(state) {
                const strs = [];
                let raw = '';
                const vals = [];
                const html = (strings, ...values) => {
                    raw += strings.raw;
                    if (strs.length) {
                        strs.push(strs.pop() + strings[0]);
                        strs.push(...strings.slice(1));
                    } else {
                        strs.push(...strings);
                    }
                    vals.push(...values);
                };
                info.template(html, state, this.handlerProxy);
                // console.log(strs);
                // console.log(vals);
                if (typeof info.style === "function") {
                    info.style(html, state);
                } else {
                    html`${info.style}`;
                }
                // console.log(strs);
                // console.log(vals);
                strs['raw'] = raw;
                this.html(strs as any, ...vals);
            }

            created() {
                if (!defined)
                    return;
                // const dependencies = Reflector.paramTypes(target).map(type => Container.get(type));
                this.component = Container.get(target);//new target(...dependencies);
                this.component['id'] = this._id;
                this.handlerProxy = new Proxy({}, {
                    get: (target, key) => this.dispatchEvents(key)
                });
                this.component.State$.subscribe(state => {
                    this.renderState(state);
                });
                this.component.Actions$.subscribe();
                this.component.created();
            }

            dispatchEvents = type => (...args: any) => this.component._eventsSubject$.next({
                args: args,
                type: type
            });

            attributeChangedCallback(name: string, prev: string, curr: string) {
                console.log(name, prev, curr)
                this.component._attributesSubject$.next({name, value: curr});
            }
        };
        window.addEventListener('load', ()=>{
            elementConstructor.define(info.name, options);
        });
        defined = true;
    }
}

interface ComponentExtended<TState> {
    _attributesSubject$: Subject<{ name, value }>;
    _eventsSubject$: Subject<{ args: any[]; type: string }>;

    State$: Observable<TState>;
    Actions$: Observable<{ type: string; payload?: any }>;
    defaultState: TState;

    Render(html, state: TState, events);

    created();
}

export type IEventHandler<TEvents> = {
    [K in keyof TEvents]: (Event) => void
};

export abstract class HyperComponent<TState = any, TEvents = any> {

    State$: Observable<TState> = of(null);
    Actions$: Observable<{ type: string; payload?: any }> = NEVER;

    // abstract Render(html, state: TState, events: IEventHandler<TEvents>);

    created() {

    }

    protected defaultState: TState;
    private _attributesSubject$ = new ReplaySubject<{ name, value }>();
    private _eventsSubject$ = new ReplaySubject<{ args: any[]; type: keyof TEvents; }>();
    protected Events$ = this._eventsSubject$.asObservable();
    protected Attributes$ = this._attributesSubject$.asObservable().pipe(
        tap(console.log),
        scan<{ name, value }, any>((acc, val) => ({...acc, [val.name]: val.value}), {}),
        startWith({}),
        tap(console.log),
    );
}
