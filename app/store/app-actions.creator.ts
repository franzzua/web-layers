import {ActionsCreator} from "store-rxjs";

export class AppActionsCreator extends ActionsCreator<any> {
    public static CHANGE_ACTIVE = 'change_active';
    public static INCREMENT = 'increment';


    ChangeActive(isActive) {
        this.Diff({
            active: isActive
        });
    }

    IncrementItem(a: any) {
        this.Action({
            type: AppActions[AppActions.increment],
            payload: a
        });
    }
}

export enum AppActions {
    increment
}