import {IMapState, ISlideState} from "@gm/isomorphic-domain";
import {wire} from "hyperhtml"

module.exports = (html, state: IMapState, events) => html`
    ${state && state.Layers && state.Layers.map(layer => wire()`
        ${layer.Id}
    `) || ''}
`;