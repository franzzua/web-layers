import {Component, HyperComponent} from "@so/ui";
import {FreeStore} from "../../../app/stores/free/free.store";
import {Domain} from "@gm/isomorphic-domain";
import {SlideStore} from "../../../app/stores/slide/slide.store";
import {Injectable} from "@so/di";
import {map, of, tap} from "rx";
import {IRouteActions, Router} from "../../../app/router";

@Injectable({
    deps: [Domain, FreeStore, SlideStore],
    multiple: true
})
@Component({
    name: 'free-layout',
    template: require('./free-layout.tsx'),
    style: require('./free-layout.less')
})
export class FreeLayout extends HyperComponent<any, IRouteActions> {
    constructor(private domain: Domain,
                private slideStore: SlideStore,
                private routerStore: Router) {
        super();
        domain.Actions.Slides.LoadSlide(24);
        slideStore.Actions.LoadSlide(24);
    }

    public State$ = this.routerStore.State$.pipe(
        map(route => ({
            route,
            SlideId: 24
        }))
    );

    public Actions$ = this.Events$.pipe(
        tap(action => this.routerStore.Actions[action.type](...action.args))
    )

}