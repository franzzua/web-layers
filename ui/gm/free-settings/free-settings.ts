import {Component, HyperComponent} from "@so/ui";
import {FreeStore} from "../../../app/stores/free/free.store";
import {IFreeState} from "../../../app/stores/free/free.state";
import {FreeActionsCreator} from "../../../app/stores/free/free-actions-creator.service";
import {map} from "rxjs/operators";
import {combineLatest, tap} from "rx";
import {ILevel} from "@gm/isomorphic-domain";
import {ISpace} from "@gm/isomorphic-core";

@Component({
    name: 'gm-free-settings',
    template: require('./free-settings.tsx'),
    style: require('./free-settings.less')
})
export class FreeSettings extends HyperComponent<IFreeSettingsSpace, FreeActionsCreator> {
    constructor(private freeStore: FreeStore) {
        super();
    }

    public State$ = combineLatest(
        this.freeStore.State$,
        this.freeStore.CurrentMapSpace$,
        this.freeStore.CurrentMapSettings$).pipe(
        map(([state,space,settings]) => ({
            ...state,
            current: {
                ...settings,
                space,
                level: {
                    Type: settings.levelType,
                    Value: settings.levelValue
                }
            }
        }))
    );

    public Actions$ = this.Events$.pipe(
        tap(a => (this.freeStore.Actions[a.type] as any)(...a.args))
    )
}

export type IFreeSettingsSpace = IFreeState & {
    current: {
        space: ISpace
        template,
        level: ILevel,
        pTime
    }
}