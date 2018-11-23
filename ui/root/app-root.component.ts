import {Component, HyperComponent} from "../../framework/component";

@Component({
    name: 'app-root',
    template: html => html`<free-layout/>`,
    style: require('./app-root.less')
})
export class AppRoot extends HyperComponent{

}