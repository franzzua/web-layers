import {combineLatest, debounceTime, filter, first, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {ICurrentState} from './slide.state';
import {SlideActions} from './slide.actions';
import {Action, AnyAction} from 'redux';
import {SlideStore} from './slide.store';
import {Domain, ISlideState as SlideState} from '@gm/isomorphic-domain';
import {Observable} from "rxjs";
import {Fn} from "@gm/isomorphic-core";
import {Injectable} from "@so/di";
import {combineEpics, Epic} from "store-rxjs";

@Injectable()
export class SlideEpic {

    private actions = new SlideActions();

    constructor(private domain: Domain) {

    }

    //
    // public createSlideEpic(actions$, slide: SlideStore) {
    //   return actions$.pipe(
    //     filter<Action>(a => a.type == this.actions.CREATE_SLIDE),
    //     mergeMap(id => this.domainActions.Slides.CreateSlide({})),
    //     //delay(1000),
    //     mergeMap<any, any>(data => [
    //       {type: this.actions.SLIDE_LOADED, payload: data},
    //       {type: this.actions.SLIDE_SELECT, payload: data.slide.Id}
    //     ])
    //   );
    // }

    public slideLoadEpic(actions$: Observable<AnyAction>, store: SlideStore) {
        return actions$.pipe(
            filter<AnyAction>(a => a.type == this.actions.SLIDE_LOAD),
            map(a => a.payload),
            mergeMap(id => this.domain.State$.pipe(
                mergeMap(Fn.I),
                filter(s => s.Id == id),
                first(),
            )),
            map((slideState: SlideState) => ({
                type: this.actions.DIFF_ACTION,
                payload: <ICurrentState>{
                    CurrentSlideId: slideState.Id,
                    CurrentMapId: slideState.Maps[0].Id,
                    CurrentLayerId: slideState.Maps[0].Layers[0].Id
                }
            }))
        );
    }

    public layerChangeEpic(actions$, store: SlideStore) {
        return actions$.pipe(
            filter<Action>(a => a.type == this.actions.LAYER_CHANGE),
            map<any, string>(a => a.payload),
            debounceTime(100),
            withLatestFrom(store.CurrentLayer$),
            tap(([settings, layer]) => this.domain.Actions.Layers.Update(layer.Id)),
            map(([settings, layer]) => ({
                type: `Layers.diff`,
                layerId: layer.Id,
                payload: settings
            }))
        );
    }

    public mapChangeEpic(actions$, store: SlideStore) {
        return actions$.pipe(
            filter<Action>(a => a.type == this.actions.MAP_CHANGE),
            map<any, string>(a => a.payload),
            withLatestFrom(store.CurrentMap$),
            debounceTime(200),
            tap(([settings, map]) => this.domain.Actions.Maps.UpdateSettings(map.Id, settings)),
            map(([settings, map]) => ({
                type: `Maps.diff`,
                mapId: map.Id,
                payload: settings
            })),
        );
    }

    public spaceChangeEpic(actions$, store: SlideStore) {
        return actions$.pipe(
            filter<Action>(a => a.type == this.actions.SPACE_CHANGE),
            map<any, string>(a => a.payload),
            withLatestFrom(store.CurrentMap$),
            tap(([spaceId, map]) => this.domain.Actions.Maps.UpdateSpace(map.Id, {Id: spaceId})),
            map(([space, map]) => ({
                type: `Maps.diff`,
                mapId: map.Id,
                payload: {Space: space}
            }))
        );
    }

    public epic$: Epic<any, ICurrentState> = combineEpics<ICurrentState>(
        // this.createSlideEpic.bind(this),
        // this.spaceChangeEpic.bind(this),
        this.slideLoadEpic.bind(this),
        this.layerChangeEpic.bind(this),
        // this.mapChangeEpic.bind(this)
    );
}
