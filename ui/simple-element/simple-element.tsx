import {IEvents, IState} from "./simple-element";
import {wire} from "hyperhtml";


module.exports = (html, state: IState, events: IEvents) => html`

<div>Hello man ${state.name} is ${state.active}</div>
${state.active ? state.items.map(item => wire()`

<button onclick="${_ => events.increment(item)}">${item}</button>
    
`) : ''
}
<input type="checkbox"
       checked="${state.active ? 'checked' : ''}"
       onchange="${events.active}">`;