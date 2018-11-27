import {Component, HyperComponent} from "@so/ui";
import {distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import {SlideStore} from "../../../app/stores/slide/slide.store";
import {filter} from "rx";
import {compareArrays, IGmSlideState} from "../gm-slide/gm-slide";

@Component({
    name: 'gm-map',
    template: require('./map-component.tsx'),
    style: require('./map.component.less'),
    observedAttributes: ['id', 'slide']
})
export class MapComponent extends HyperComponent<IMapComponentState> {
    constructor(private slideStore: SlideStore) {
        super();
    }

    private Id$ = this.Attributes$.pipe(
        distinctUntilChanged((a, b) => a.id == b.id && a.slide == b.slide)
    );

    public State$ = this.Id$.pipe(
        filter(({id, slide}) => id && slide),
        switchMap(({id, slide}) => this.slideStore.GetMap$(id, slide)),
        map(map => ({
            MapId: map.Id,
            SlideId: map.SlideId,
            Layers: map.Layers.map(l => ({Id: l.Id, Order: l.Order})),
        })),
        distinctUntilChanged(Compare),
    )

}

export interface IMapComponentState {
    SlideId: number;
    MapId: number;
    Layers: {
        Id: number;
        Order: number;
    }[];
}

function Compare(a: IMapComponentState, b: IMapComponentState) {
    if (a.SlideId != b.SlideId)
        return false;
    if (a.MapId != b.MapId)
        return false;
    return compareArrays(a.Layers, b.Layers, (a, b) => a.Id == b.Id && a.Order == b.Order);
}
