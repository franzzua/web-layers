import {IEvents, IState} from "./simple-element";

module.exports = (html, state: IState, events: IEvents) => html`
<div>Hello man ${state.name} is ${state.active}</div>
<input type="checkbox"
       checked="${state.active ? 'checked' : ''}"
       onchange="${events.active}">`;
