import {wire} from "hyperhtml";
import {IFreeActions} from "./free-layout";

module.exports = (html, state, events: IFreeActions) => {


    const routeViews = {
        free: () => wire()`
<div class="is-overlay is-clipped">
  <gm-slide id="${state.SlideId}" class="is-overlay"></gm-slide>
  <div class="controls is-overlay">
    <gm-free-settings state="freeStore.State$"></gm-free-settings>
  </div>
</div>
        `,
        home: () => wire()`
<div>Home</div>
`,
        profile: () => wire()`
<div>Profile</div>
`,
    };

    return html`
<header  layout horizontal end-justified>
    <nav>
        <span class="is-white">${state.date}</span>
        
    </nav>        
</header>
<main>
        ${routeViews[state.route.name](state)}
</main>
    `;


};