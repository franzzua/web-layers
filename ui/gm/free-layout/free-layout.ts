import {Component, HyperComponent} from "@so/ui";
import {FreeStore} from "../../../app/stores/free/free.store";
import {Domain} from "@gm/isomorphic-domain";
import {SlideStore} from "../../../app/stores/slide/slide.store";
import {Injectable} from "@so/di";
import {filter, map, merge, of, tap} from "rx";
import {IRouteActions, Router} from "../../../app/router";
import {utc} from "@so/utils";

@Injectable({
    deps: [Domain, FreeStore, SlideStore],
    multiple: true
})
@Component({
    name: 'free-layout',
    template: require('./free-layout.tsx'),
    style: require('./free-layout.less')
})
export class FreeLayout extends HyperComponent<any, IFreeActions> {
    private deferredPrompt: any;
    constructor(private domain: Domain,
                private slideStore: SlideStore,
                private routerStore: Router) {
        super();
        domain.Actions.Slides.LoadSlide(24);
        slideStore.Actions.LoadSlide(24);

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            this.deferredPrompt = e;
        });
    }

    public State$ = this.domain.State$.pipe(
        map(route => ({
            route: {name: 'free'},
            date: utc().toISOString(),
            SlideId: 24
        }))
    );

    private InstallActions$ = this.Events$.pipe(
        filter(action => action.type == 'install'),
        tap(() => {
            if (!this.deferredPrompt)
                return;
            this.deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            this.deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    this.deferredPrompt = null;
                });
        })
    );
    private RouterActions$ = this.Events$.pipe(
        filter(action => action.type in this.routerStore.Actions),
        tap(action => this.routerStore.Actions[action.type](...action.args))
    );

    public Actions$ = merge(
        this.RouterActions$,
    )
}

export interface IFreeActions extends IRouteActions{
    install;
}