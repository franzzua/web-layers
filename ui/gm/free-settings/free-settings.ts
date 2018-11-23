import {Component, HyperComponent} from "../../../framework/component";
import {FreeStore} from "../../../app/free/free.store";
import {IFreeState} from "../../../app/free/free.state";

@Component({
    name: 'gm-free-settings',
    template: require('./free-settings.tsx'),
    style: require('./free-settings.less')
})
export class FreeSettings extends HyperComponent<IFreeState> {
    constructor(private freeStore: FreeStore) {
        super();
    }

    public State$ = this.freeStore.State$.pipe(

    )
}

export interface IFreeSettingsState {
    spaces: string[]
}