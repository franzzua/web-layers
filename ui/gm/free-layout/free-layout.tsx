import {wire} from "hyperhtml";
import {IRouteActions} from "../../../app/router";

module.exports = (html, state, events: IRouteActions) => {


    const routeViews = {
        free: () => wire()`
<div layout fit vertical>
  <gm-slide id="${state.SlideId}" layout fit></gm-slide>
  <div layout fit class="controls">
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
<header>
    <nav>
        <a class="button" href="/" onclick="${e => e.preventDefault() || events.navigate('home')}">Home</a>
        <a class="button" href="/free" 
        onclick="${e => e.preventDefault() || events.navigate('free')}">Free</a>
        <a class="button" href="/profile" 
        onclick="${e => e.preventDefault() || events.navigate('profile')}">Profile</a>
    </nav>        
</header>
<main>
        ${routeViews[state.route.name](state)}
</main>
    `;


};