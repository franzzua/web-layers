import {Component, HyperComponent} from "../../../framework/component";
import {FreeStore} from "../../../app/free/free.store";
import {IFreeState} from "../../../app/free/free.state";
import {FreeActionsCreator} from "../../../app/free/free-actions-creator.service";
import {map} from "rxjs/operators";
import {tap} from "../../../rx";

@Component({
    name: 'gm-free-settings',
    template: require('./free-settings.tsx'),
    style: require('./free-settings.less')
})
export class FreeSettings extends HyperComponent<IFreeState, FreeActionsCreator> {
    constructor(private freeStore: FreeStore) {
        super();
    }

    public State$ = this.freeStore.State$;

    public Actions$ = this.Events$.pipe(
        tap(a => (this.freeStore.Actions[a.type] as any)(...a.args))
    )
}
