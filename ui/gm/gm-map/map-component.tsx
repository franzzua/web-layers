import {IMapState} from "@gm/isomorphic-domain";
import {wire} from "hyperhtml"
import {IMapComponentState} from "./map.component";

module.exports = (html, state: IMapComponentState, events) => html`
    ${state && state.Layers && state.Layers.map(layer => wire()`
        <gm-layer id="${layer.Id}" map="${state.MapId}" slide="${state.SlideId}"
                class="is-overlay"
                style="${`z-index: ${layer.Order}`}"></gm-layer>
    `) || ''}
`;