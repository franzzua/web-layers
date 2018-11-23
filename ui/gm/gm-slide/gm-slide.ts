import {Component, HyperComponent} from "../../../framework/component";
import {combineLatest} from "rxjs/internal/observable/combineLatest";
import {Domain, ISlideState} from "@gm/isomorphic-domain";
import {map} from "rxjs/operators";

@Component({
    name: 'gm-slide',
    template: require('./gm-slide.tsx'),
    style: require('./gm-slide.less'),
    observedAttributes: ['id']
})
export class GmSlide extends HyperComponent<ISlideState>{
    constructor(private domain: Domain) {
        super();
    }

    public State$ = combineLatest(this.Attributes$, this.domain.State$).pipe(
        map(([{id}, slides]) => slides.find(s => s.Id == id))
    );

}