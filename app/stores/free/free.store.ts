import {IFreeState} from "./free.state";
import {AppStore} from "../app/app.store";
import {utcToday} from "@gm/isomorphic-core";
import {Observable} from "rxjs";
import {FreeActionsCreator} from "./free-actions-creator.service";
import {FreeReducer} from "./free.reducer";
import {FreeEpic} from "./free.epic";
import {distinctUntilChanged, map} from "rxjs/operators";
import {Level} from "@gm/isomorphic-domain";
import {ObservableStore} from "store-rxjs";
import {Injectable} from "@so/di";
import {SlideStore} from "../slide/slide.store";

@Injectable()
export class FreeStore extends ObservableStore<IFreeState> {
    constructor(appStore: AppStore,
                private slideStore: SlideStore,
                protected epic: FreeEpic) {
        super(appStore, 'free');
    }

    public Actions: FreeActionsCreator = new FreeActionsCreator();

    public State$: Observable<IFreeState> = this.asObservable();

    public CurrentLayer$ = this.slideStore.CurrentLayer$;
    public CurrentMapSpace$ = this.slideStore.CurrentMap$.pipe(
        map(map => map.Space),
        distinctUntilChanged()
    );

    public CurrentMapSettings$: Observable<{
        template,
        levelType,
        levelValue,
        pTime
    }> = this.slideStore.CurrentMap$.pipe(
        map(map => map.Settings)
    );
    public CurrentLevel$ = this.CurrentMapSettings$.pipe(
        map(settings => ({Type: settings.levelType, Value: settings.levelValue})),
        distinctUntilChanged(null, Level.ToString)
    );

    protected reducer = new FreeReducer();

    Init() {
        super.Init(<IFreeState>{
            ObsTime: utcToday(),
            Prediction: 360,
            Layers: [
                'temperature',
                'wind',
                'pressure'
            ],
            Spaces: [
                'ICAO_G',
                'ICAO_GR',
                'ICAO_EUR'
            ],
            Levels: [
                {Type: 10, Value: 300},
                {Type: 10, Value: 500},
                {Type: 10, Value: 700},
                {Type: 1, Value: 0},
            ],
            Templates: [
                {label: 'T', template: 'free.temperature'},
                {label: 'W', template: 'free.windgust'},
            ]
        })
    }

}

