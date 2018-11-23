import {ISlideState} from "@gm/isomorphic-domain";
import {wire} from "hyperhtml"

module.exports = (html, state: ISlideState, events) => html`
    ${state && state.Maps ? wire(state)`
    <gm-map id="${state.Maps[0].Id}" slide="${state.Id}"/>
    ` : ''}    
`;