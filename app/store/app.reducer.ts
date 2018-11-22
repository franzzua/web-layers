import {Reducer} from 'redux';
import {AppActions} from "./app-actions.creator";
import {objectReducer} from "store-rxjs";

export class AppReducer {
    reduce: Reducer<any> = objectReducer<any>((state, action) => {
        switch (AppActions[action.type] as any as AppActions) {
            case AppActions.increment:
                const items = state.items;
                return {
                    ...state,
                    items: items.map(i => i == action.payload ? i + 1 : i)
                };
            default:
                return state;
        }
    });
}