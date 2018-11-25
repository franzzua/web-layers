import {ICurrentState} from './slide.state';
import {SlideEpic} from './slide.epic';
import {distinctUntilChanged, filter, map, mergeMap, shareReplay, tap} from 'rxjs/operators';
import {SlideActions} from './slide.actions';
import {SlideReducer} from './slide.reducer';
import {Observable, combineLatest} from 'rxjs';
import {Domain, IMapState, ISlideState, ILayer} from "@gm/isomorphic-domain";
import {Fn} from "@gm/isomorphic-core";
import {DomainStore} from "./domain.store";
import {ObservableStore, RootStore} from "store-rxjs";
import {Injectable} from "@so/di";

@Injectable()
export class SlideStore extends ObservableStore<ICurrentState> {
    constructor(rootStore: RootStore,
                private domainStore: DomainStore,
                private domain: Domain,
                protected epic: SlideEpic) {
        super(rootStore, 'slide');
    }

    public Init() {
        super.Init({});
        // this.domainStore.Register(this, 'domain');
    }

    protected reducer = new SlideReducer();

    public Actions = new SlideActions();
    public State$ = this.asObservable().pipe(
        filter(Fn.Ib),
        distinctUntilChanged()
    );

    public CurrentSlideId$: Observable<number> = this.State$.pipe(map(s => s.CurrentSlideId));
    public CurrentMapId$: Observable<number> = this.State$.pipe(map(s => s.CurrentMapId));
    public CurrentLayerId$: Observable<number> = this.State$.pipe(map(s => s.CurrentLayerId));

    public CurrentSlide$: Observable<ISlideState> = combineLatest(this.domain.State$, this.CurrentSlideId$).pipe(
        filter(([slides, slideId]) => !!slides),
        map(([slides, slideId]) => slides.find(slide => slide.Id == slideId)),
        filter(Fn.Ib),
        distinctUntilChanged(),
        shareReplay(1)
    );

    public CurrentMaps$: Observable<IMapState[]> = this.CurrentSlide$.pipe(
        map(slideState => slideState.Maps),
        filter(Fn.Ib),
        distinctUntilChanged(),
    );
    public CurrentMap$: Observable<IMapState> = combineLatest(this.CurrentSlide$, this.CurrentMapId$).pipe(
        map(([slide, mapId]) => slide.Maps.filter(map => map.Id == mapId)[0]),
        filter(Fn.Ib),
        distinctUntilChanged(),
    );

    public CurrentLayers$: Observable<ILayer[]> = this.CurrentMap$.pipe(
        map(map => map.Layers),
        distinctUntilChanged(),
    );
    public CurrentLayer$: Observable<ILayer> = combineLatest(this.CurrentLayers$, this.CurrentLayerId$).pipe(
        map(([layers, LayerId]) => layers.filter(layer => layer.Id == LayerId)[0]),
        filter(Fn.Ib),
        distinctUntilChanged(),
    );

    GetMap$(id: any, slideId: number): Observable<IMapState> {
        return this.domain.State$.pipe(
            map(slides => slides.find(s => s.Id == slideId)),
            map(slide => slide.Maps.find(m => m.Id == id))
        )
    }
}
