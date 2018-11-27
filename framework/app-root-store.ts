import {Injectable} from "@so/di";
import {Store, RootStore} from "store-rxjs";


@Injectable()
export class AppRootStore extends RootStore {
    constructor() {
        super(new Store(), true);
    }

}