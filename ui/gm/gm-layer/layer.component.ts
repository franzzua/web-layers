import {Component, HyperComponent} from "@so/ui";
import {delay, distinctUntilChanged, first, map, mergeMap, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {SlideStore} from "../../../app/stores/slide/slide.store";
import {filter, startWith} from "rx";
import {CanvasContext, IContext, Renderer} from "@gm/isomorphic-render";
import {combineLatest, Observable} from "rxjs";
import {ILayerState, IMapState} from "@gm/isomorphic-domain";
import {utc} from "@so/utils";
import {animationFrame} from "rxjs/internal/scheduler/animationFrame";

@Component({
    name: 'gm-layer',
    template: require('./layer-component.tsx'),
    style: require('./layer.component.less'),
    observedAttributes: ['id', 'map', 'slide']
})
export class LayerComponent extends HyperComponent {
    constructor(private slideStore: SlideStore) {
        super();
    }


    private Context$: Observable<IContext> = this.select<HTMLCanvasElement>('canvas').pipe(
        first(),
        map(canvas => {
            const rect = canvas.getBoundingClientRect();
            console.log(rect);
            return new CanvasContext(canvas.getContext('2d'), rect.width || window.innerWidth, rect.height || window.innerHeight);
        }),
    );

    private Map$: Observable<IMapState> = this.Attributes$.pipe(
        filter(({map, slide}) => map && slide),
        mergeMap(({map, slide}) => this.slideStore.GetMap$(map, slide)),
    );

    private Layer$: Observable<ILayerState> = combineLatest(this.Attributes$, this.Map$).pipe(
        map(([{id}, map]) => map.Layers.find(l => l.Id == id)),
        distinctUntilChanged(null, layer => layer.Version),
    );

    private Renderer$: Observable<Renderer> = combineLatest(this.Map$, this.Context$).pipe(
        distinctUntilChanged(null, ([map]) => map.Version),
        map(([map, context]) => new Renderer(map.Space, context))
    );

    private Rendering$ = combineLatest(this.Renderer$, this.Layer$).pipe(
        distinctUntilChanged(null, ([renderer, layer]) => layer.Version),
        delay(0, animationFrame),
        // tap(([renderer, layer]) => console.time(`render.${layer.Id}.${layer.Version}`)),
        tap(([renderer, layer]) => {
            renderer.Render(layer.Data, true);
        }),
        map(_ => utc())
        // tap(([renderer, layer]) => console.timeEnd(`render.${layer.Id}.${layer.Version}`)),
    );

    public State$ = this.Rendering$.pipe(
        startWith(utc()),
        map(utc => utc.toISOString()),
    )
}