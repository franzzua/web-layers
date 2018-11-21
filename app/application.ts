import {Injectable} from "@decorators/di";
import {AppRootStore} from "../framework/app-root-store";
import '../ui/simple-element';

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

