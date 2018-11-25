import {Component, HyperComponent} from "@so/ui";

@Component({
    name: 'app-root',
    template: html => html`<free-layout/>`,
    style: require('./app-root.less')
})
export class AppRoot extends HyperComponent{

}