import {IMapState} from "@gm/isomorphic-domain";
import {wire} from "hyperhtml"

module.exports = (html, state: IMapState, events) => html`
    <canvas class="is-overlay"/>
    <span class="has-background-white" style="position: absolute; bottom: 0;">${state}</span>
`;