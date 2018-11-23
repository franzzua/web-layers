import {Component, HyperComponent} from "../../../framework/component";
import {combineLatest} from "rxjs/internal/observable/combineLatest";
import {Domain, IMapState, ISlideState} from "@gm/isomorphic-domain";
import {map, switchMap, tap} from "rxjs/operators";
import {SlideStore} from "../../../app/slide/slide.store";
import {filter} from "../../../rx";

@Component({
    name: 'gm-map',
    template: require('./map-component.tsx'),
    style: require('./map.component.less'),
    observedAttributes: ['id', 'slide']
})
export class MapComponent extends HyperComponent<IMapState> {
    constructor(private slideStore: SlideStore) {
        super();
    }

    private Id$ = this.Attributes$.pipe(
        map(({id}) => id)
    );

    public State$ = this.Attributes$.pipe(
        filter(({id, slide}) => id && slide),
        switchMap(({id, slide}) => this.slideStore.GetMap$(id, slide))
    )

}