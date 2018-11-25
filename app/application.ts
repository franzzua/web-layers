import {RootStore} from "store-rxjs";
import {Container} from "@so/di";
import {init} from "@so/ui";

export class Application {
    constructor(root: RootStore, container: Container) {
        root.createStore();
        init(container);
    }

    Start() {
    }

    Stop() {

    }
}

