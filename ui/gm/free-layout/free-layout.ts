import {Component, HyperComponent} from "../../../framework/component";
import {FreeStore} from "../../../app/free/free.store";

@Component({
    name: 'free-layout',
    template: require('./free-layout.tsx'),
    style: require('./free-layout.less')
})
export class FreeLayout extends HyperComponent {
    constructor(private freeStore: FreeStore) {
        super();
    }

}