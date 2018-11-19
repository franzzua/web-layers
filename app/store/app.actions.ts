import {ActionsCreator} from "store-rxjs/dist";

export class AppActions extends ActionsCreator<any> {
    public static CHANGE_ACTIVE = 'change_active';

    ChangeActive(isActive) {
        this.Diff({
            active: isActive
        });
    }
}