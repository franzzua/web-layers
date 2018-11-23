import {IFreeSettingsState} from "./free-settings";
import {wire} from "hyperhtml";

module.exports = (html, state: IFreeSettingsState, events) => html`
<div spaces>
    ${state.spaces ? state.spaces.map(space => wire()`
    
  <button mat-button mat-mini-fab
          [color]="(freeStore.CurrentMapSpace$ | async)?.Name == space ? 'accent' : ''"
          (click)="freeStore.Actions.ChangeSpace(space)">
    {{space.split('_').pop()}}
  </button>
    `) : ''}
</div>

<div templates layout vertical center-center>
  <button *ngFor="let t of Templates"
          mat-button mat-mini-fab
          [color]="(freeStore.CurrentMapSettings$ | async)?.template == t.template ? 'accent' : ''"
          (click)="freeStore.Actions.ChangeMapSettings({template: t.template})">
    {{t.label}}
  </button>
</div>
<div levels layout vertical center-center>
  <button *ngFor="let level of State?.Levels"
          mat-button mat-mini-fab
          [color]="compareLevels((freeStore.CurrentLevel$ | async),level) ? 'accent' : ''"
          (click)="freeStore.Actions.ChangeMapSettings({levelType: level.Type, levelValue: level.Value})">
    {{level | level}}
  </button>
</div>
<div timeline>
  <gm-timeline [date]="(freeStore.CurrentMapSettings$ | async)?.obsTime"
               [prediction]="(freeStore.CurrentMapSettings$ | async)?.pTime"
               (prediction)="freeStore.Actions.ChangeMapSettings({pTime: $event})"></gm-timeline>
</div>

`;