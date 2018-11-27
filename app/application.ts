import {RootStore} from "store-rxjs";
import {Container} from "@so/di";
import {RegisterUI} from "../ui";

export class Application {
    constructor(private root: RootStore,
                private container: Container) {
    }

    Start() {

        this.root.createStore();
        RegisterUI(this.container);
    }

    Stop() {

    }
}

