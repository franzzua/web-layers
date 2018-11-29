import {Component, HyperComponent} from "@so/ui";

@Component({
    name: 'app-root',
    template: html => html`<free-layout/>`,
    style: [
        require('./bulma.sass'),
        require('./app-root.less'),
    ].join('\n')
})
export class AppRoot extends HyperComponent{

}