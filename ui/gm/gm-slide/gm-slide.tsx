import {IGmSlideState} from "./gm-slide";

module.exports = (html, state: IGmSlideState, events) => html`
    <gm-map id="${state.Maps[0]}" slide="${state.SlideId}"/>
`;