import {IFreeState} from "./free.state";
import {ActionsCreator} from "store-rxjs";
import {Injectable} from "@decorators/di";


@Injectable()
export class FreeActionsCreator extends ActionsCreator<IFreeState> {


    public ChangeSpace(space: string) {
        this.Action({
            type: FreeActions.CHANGE_SPACE,
            payload: space
        });
    }

    public ChangeMapSettings(settings: any) {
        this.Action({
            type: FreeActions.CHANGE_MAP_SETTINGS,
            payload: settings
        });
    }
}

export const FreeActions = {
    CHANGE_SPACE: 'change_space',
    CHANGE_MAP_SETTINGS: 'change_map_settings',
    VALIDATE: 'validate'
}