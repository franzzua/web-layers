import {Component, HyperComponent} from "@so/ui";
import {Domain, ISlideState} from "@gm/isomorphic-domain";
import {mapTo, tap} from "rx";
import {Observable} from "rxjs";
import {CanvasContext, IContext, Renderer} from "@gm/isomorphic-render";
import {first, map, withLatestFrom} from "rxjs/operators";

@Component({
    name: 'simple-div',
    observedAttributes: ['name'],
    booleanAttributes: ['active'],
    template: (html,state, events) => html`
        <canvas/>
        <button onclick="${events.render}">Render</button>
    `,
    style: require('./simple-element.less')
})
export class SimpleElement extends HyperComponent<IState, IEvents> {
    private State: ISlideState;

    constructor(private domain: Domain) {
        super();
        domain.LoadSlide(24).subscribe(state => {
            this.State = state;
            this.Context$.subscribe(context => this.renderToCanvas(context));
        });
    }

    private Context$: Observable<IContext> = this.select<HTMLCanvasElement>('canvas').pipe(
        first(),
        map(canvas => {
            const rect = canvas.getBoundingClientRect();
            return new CanvasContext(canvas.getContext('2d'), rect.width || 1920, rect.height || 1080);
        }),
    );

    public Actions$ = this.Events$.pipe(
        withLatestFrom(this.Context$),
        tap(([_, context]) => this.renderToCanvas(context)),
        mapTo(null)
    );

    private renderToCanvas(context) {
        requestAnimationFrame(()=>{
            console.profile('render');
            console.time('render');
            const renderer = new Renderer(this.State.Maps[0].Space, context);
            renderer.Render(this.State.Maps[0].Layers[0].Data, true);
            console.profileEnd('render');
            console.timeEnd('render');
        });
    }
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