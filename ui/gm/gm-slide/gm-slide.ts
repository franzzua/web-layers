import {Component, HyperComponent} from "@so/ui";
import {combineLatest} from "rxjs/internal/observable/combineLatest";
import {Domain, ISlideState} from "@gm/isomorphic-domain";
import {distinctUntilChanged, map, tap} from "rxjs/operators";

@Component({
    name: 'gm-slide',
    template: require('./gm-slide.tsx'),
    style: require('./gm-slide.less'),
    observedAttributes: ['id']
})
export class GmSlide extends HyperComponent<IGmSlideState> {
    constructor(private domain: Domain) {
        super();
    }

    private Id$ = this.Attributes$.pipe(
        map(({id}) => id),
        distinctUntilChanged()
    );

    public State$ = combineLatest(this.Id$, this.domain.State$).pipe(
        map(([id, slides]) => slides.find(s => s.Id == id)),
        map(slide => ({
            Maps: slide.Maps.map(m => m.Id),
            SlideId: slide.Id
        })),
        distinctUntilChanged(Compare)
    );

}

function Compare(a: IGmSlideState, b: IGmSlideState) {
    if (a.SlideId != b.SlideId)
        return false;
    return compareArrays(a.Maps, b.Maps);
}

export interface IGmSlideState {
    SlideId: number;
    Maps: number[];
}

export function compareArrays<T>(a: T[], b: T[], itemCompare: (a: T, b: T) => boolean = (a, b) => a == b) {
    if (a.length != b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (!itemCompare(a[i], b[i]))
            return false;
    }
    return true;
}