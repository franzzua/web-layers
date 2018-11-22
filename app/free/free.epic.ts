import {FreeActions} from "./free-actions-creator.service";
import {map, mapTo,  tap, withLatestFrom} from "rxjs/operators";
import {Injectable} from "@decorators/di";
import {ActionsObservable, combineEpics, Epic, ofType} from "store-rxjs";
import {SlideStore} from "../slide/slide.store";
import {Domain} from "@gm/isomorphic-domain";

@Injectable()
export class FreeEpic {

    constructor(private domain: Domain,
                private slideStore: SlideStore) {

    }

    private domainEvents$ = action$ => this.domain.State$.pipe(

    );
    private changeMapSettings$ = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(FreeActions.CHANGE_MAP_SETTINGS),
        map<any, string>(a => a.payload),
        withLatestFrom(this.slideStore.CurrentMapId$),
        tap(([settings, mapId]) => this.domain.Actions.Maps.UpdateSettings(mapId, settings)),
        mapTo({type: FreeActions.VALIDATE, payload: {}})
    );

    private changeSpace$ = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(FreeActions.CHANGE_SPACE),
        map<any, string>(a => a.payload),
        withLatestFrom(this.slideStore.CurrentMapId$),
        tap(([space, mapId]) => this.domain.Actions.Maps.UpdateSpace(mapId, {Name: space})),
        mapTo({type: FreeActions.VALIDATE, payload: {}})
    );

    public epic$: Epic<any, any> = combineEpics(
        this.changeSpace$,
        this.changeMapSettings$
    );
}
