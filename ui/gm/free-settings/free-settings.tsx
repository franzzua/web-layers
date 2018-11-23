import {wire} from "hyperhtml";
import {IFreeState} from "../../../app/free/free.state";
import {FreeActionsCreator} from "../../../app/free/free-actions-creator.service";

module.exports = (html, state: IFreeState, events: FreeActionsCreator) => html`
<div spaces>
    ${state.Spaces ? state.Spaces.map(space => wire()`
    
  <button mat-button mat-mini-fab
          [color]="(freeStore.CurrentMapSpace$ | async)?.Name == space ? 'accent' : ''"
          onclick="${_ => events.ChangeSpace(space)}">
    ${space.split('_').pop()}
  </button>
    `) : ''}
</div>

<!--<div templates layout vertical center-center>-->
  <!--<button *ngFor="let t of Templates"-->
          <!--mat-button mat-mini-fab-->
          <!--[color]="(freeStore.CurrentMapSettings$ | async)?.template == t.template ? 'accent' : ''"-->
          <!--(click)="freeStore.Actions.ChangeMapSettings({template: t.template})">-->
    <!--{{t.label}}-->
  <!--</button>-->
<!--</div>-->
<!--<div levels layout vertical center-center>-->
  <!--<button *ngFor="let level of State?.Levels"-->
          <!--mat-button mat-mini-fab-->
          <!--[color]="compareLevels((freeStore.CurrentLevel$ | async),level) ? 'accent' : ''"-->
          <!--(click)="freeStore.Actions.ChangeMapSettings({levelType: level.Type, levelValue: level.Value})">-->
    <!--{{level | level}}-->
  <!--</button>-->
<!--</div>-->
<!--<div timeline>-->
  <!--<gm-timeline [date]="(freeStore.CurrentMapSettings$ | async)?.obsTime"-->
               <!--[prediction]="(freeStore.CurrentMapSettings$ | async)?.pTime"-->
               <!--(prediction)="freeStore.Actions.ChangeMapSettings({pTime: $event})"></gm-timeline>-->
<!--</div>-->

`;