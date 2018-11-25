import {Component, HyperComponent} from "@so/ui";
import {FreeStore} from "../../../app/free/free.store";
import {Domain} from "@gm/isomorphic-domain";
import {SlideStore} from "../../../app/slide/slide.store";
import {Injectable} from "@so/di";
import {of} from "rxjs";

@Injectable({
    deps: [Domain, FreeStore, SlideStore],
    multiple: true
})
@Component({
    name: 'free-layout',
    template: require('./free-layout.tsx'),
    style: require('./free-layout.less')
})
export class FreeLayout extends HyperComponent {
    constructor(private domain: Domain,
                private freeStore: FreeStore,
                private slideStore: SlideStore) {
        super();
        domain.Actions.Slides.LoadSlide(24);
        slideStore.Actions.LoadSlide(24);
    }

    public State$ = of({
        SlideId: 24
    })

}