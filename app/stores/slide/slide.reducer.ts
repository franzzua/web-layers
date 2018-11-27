import {ICurrentState} from './slide.state';
import {SlideActions} from './slide.actions';
import {objectReducer} from "store-rxjs";

export class SlideReducer {
  constructor() {
    this.reduce = this.reduce.bind(this);
  }

  private actions = new SlideActions();


  private innerReducer = objectReducer<ICurrentState>({
    // domain: Fn.I,
    // Slides: x => x || null,
    // Maps: arrayFilterReducer<any>(objectReducer<any>(Fn.I), Fn.I, 'Maps', (item, action) => item.Id == action.mapId),
    // Layers: arrayFilterReducer<any>(objectReducer<any>(Fn.I), Fn.I, 'Layers', (item, action) => item.Id == action.layerId),
    CurrentSlideId: x => x || null,
    CurrentMapId: x => x || null,
    CurrentLayerId: x => x || null,
  });

  public reduce(state: ICurrentState, action): ICurrentState {
    switch (action.type) {
      // case this.actions.SLIDE_LOADED:
      //     return Object.assign({}, state, {
      //         Layers: [...(state.Layers || []), ...action.payload.layers],
      //         Maps: [...(state.Maps || []), ...action.payload.maps],
      //         Slides: [...(state.Slides || []), action.payload.slide]
      //     });
      case this.actions.SLIDE_SELECT:
        // const map = (state.Maps || []).filter(map => map.SlideId == action.payload)[0];
        // const layer = (state.Layers || []).filter(map => map.SlideId == action.payload)[0];
        return Object.assign({}, state, {
          CurrentSlideId: action.payload,
          // CurrentMapId: map ? map.Id : null,
          // CurrentLayerId: layer ? layer.Id : null,
        });
      default:
        return this.innerReducer(state, action);
    }
  }
}
