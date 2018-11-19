import {Injectable} from "@decorators/di";
import {AppRootStore} from "../framework/app-root-store";

@Injectable()
export class Application {
    constructor(root: AppRootStore) {
        root.createStore();
    }

    Start(){

    }

    Stop(){

    }
}

