import {Reducer, AnyAction} from "redux";
import {IFreeState} from "./free.state";
import {FreeActions} from "./free-actions-creator.service";
import {objectReducer} from "store-rxjs";

export class FreeReducer {

  private stateReducer = ((state: IFreeState | undefined, action: AnyAction) => {
    switch (action.type) {
      case FreeActions.CHANGE_SPACE:
        return {...state, Space: action.payload as string} as IFreeState;
    }
    return state;
  });

  public reduce: Reducer<IFreeState> = objectReducer<IFreeState>(this.stateReducer);
}
