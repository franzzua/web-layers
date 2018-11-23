import {RootStore} from "store-rxjs";

export class Application {
    constructor(root: RootStore) {
        root.createStore();
    }

    Start() {
    }

    Stop() {

    }
}

